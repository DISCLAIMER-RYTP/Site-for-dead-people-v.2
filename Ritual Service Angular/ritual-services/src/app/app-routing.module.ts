import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Account/login/login.component';
import { ProfileComponent } from './Components/Account/profile/profile.component';
import { RegisterComponent } from './Components/Account/register/register.component';
import { PlaceCemeteryComponent } from './Components/Services/placeCemetery/placeCemetery.component';
import { AuthGuard } from './Guards/auth.guards';

const routes: Routes = [
  { path: '', component: PlaceCemeteryComponent },
  {
    path: 'account',
    children: [
      { path: '', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent }
    ]
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
