import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { Team, TeamService } from '../../../core/services/team.service';
import { Driver, DriverService } from '../../../core/services/driver.service';

const NAME_PATTERN = /^[A-Za-z ]+$/;
const USERNAME_PATTERN = /^(?!.*__)[a-z][a-z0-9_]{1,18}[a-z0-9]$/;
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

function passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password && confirm && password !== confirm ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  teams: Team[] = [];
  currentDrivers: Driver[] = [];

  submitting = false;
  registerFailed = false;
  registerErrorMessage = '';

  private destroy$ = new Subject<void>();

  form = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
    username: ['', [Validators.required, Validators.pattern(USERNAME_PATTERN)], [this.usernameAvailableValidator()]],
    email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
    confirmPassword: ['', [Validators.required]],
    newToF1: [true],
    favoriteTeam: [''],
    favoriteDriver: ['']
  }, { validators: passwordsMatchValidator });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private teamService: TeamService,
    private driverService: DriverService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(teams => this.teams = teams);
    this.driverService.getDrivers().subscribe(drivers => this.currentDrivers = drivers.filter(d => d.current));

    this.form.get('newToF1')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(isNew => {
      if (isNew) {
        this.form.patchValue({ favoriteTeam: '', favoriteDriver: '' });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private usernameAvailableValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value || !USERNAME_PATTERN.test(control.value)) {
        return of(null);
      }
      return of(control.value).pipe(
        debounceTime(400),
        switchMap(username => this.authService.checkUsernameAvailable(username)),
        map(result => (result.available ? null : { taken: true })),
        catchError(() => of(null)),
        take(1)
      );
    };
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.registerFailed = false;

    const raw = this.form.getRawValue();
    this.authService.register({
      fullName: raw.fullName!,
      username: raw.username!,
      email: raw.email!,
      password: raw.password!,
      newToF1: !!raw.newToF1,
      favoriteTeam: raw.newToF1 ? null : (raw.favoriteTeam || null),
      favoriteDriver: raw.newToF1 ? null : (raw.favoriteDriver || null)
    }).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        this.submitting = false;
        this.registerFailed = true;
        this.registerErrorMessage = err?.error?.message || 'Something went wrong. Please try again.';
      }
    });
  }
}
