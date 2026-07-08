import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { StandingsComponent } from './features/standings/standings.component';
import { DriversComponent } from './features/drivers/drivers.component';
import { TeamsComponent } from './features/teams/teams.component';
import { CalendarComponent } from './features/calendar/calendar.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'standings', component: StandingsComponent },
  { path: 'drivers', component: DriversComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
