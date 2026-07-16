import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  currentUserName$: Observable<string | null> = this.authService.currentUserName$;

  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    this.authService.clearSession();
    this.router.navigateByUrl('/');
  }
}
