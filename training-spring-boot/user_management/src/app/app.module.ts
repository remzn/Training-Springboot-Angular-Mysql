import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule} from '@angular/forms';
import { UserDetailsComponent } from './user-details/user-details.component';
import { TimeDifferencePipe } from './time-difference.pipe';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router'; 
import { AuthService } from './services/auth.service'; // AuthService
import { AuthGuard } from './guards/auth.guard'; // AuthGuard
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailsComponent,
    TimeDifferencePipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	FormsModule,
	RouterModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
