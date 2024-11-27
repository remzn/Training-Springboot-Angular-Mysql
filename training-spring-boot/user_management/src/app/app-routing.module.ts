import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
{ path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ana rota
  { path: 'users', component: UserListComponent , canActivate: [AuthGuard]},       // Kullanıcı listesi
  { path: 'users/details/:id', component: UserDetailsComponent,canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }, // Kullanıcı detayları
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
