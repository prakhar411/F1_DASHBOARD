import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './features/home/home.component';
import { StandingsComponent } from './features/standings/standings.component';
import { DriversComponent } from './features/drivers/drivers.component';
import { TeamsComponent } from './features/teams/teams.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { CalendarComponent } from './features/calendar/calendar.component';
import { TeamBadgeComponent } from './shared/team-badge/team-badge.component';
import { TeamNamePipe } from './shared/pipes/team-name.pipe';
import { DriverAvatarComponent } from './shared/driver-avatar/driver-avatar.component';
import { DriverDetailModalComponent } from './shared/driver-detail-modal/driver-detail-modal.component';
import { TrackDetailModalComponent } from './shared/track-detail-modal/track-detail-modal.component';
import { TeamDetailModalComponent } from './shared/team-detail-modal/team-detail-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    StandingsComponent,
    DriversComponent,
    TeamsComponent,
    LoginComponent,
    SignupComponent,
    CalendarComponent,
    TeamBadgeComponent,
    TeamNamePipe,
    DriverAvatarComponent,
    DriverDetailModalComponent,
    TrackDetailModalComponent,
    TeamDetailModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
