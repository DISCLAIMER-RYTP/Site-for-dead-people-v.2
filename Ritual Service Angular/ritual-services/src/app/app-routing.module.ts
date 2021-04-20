import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Account/login/login.component';
import { ProfileComponent } from './Components/Profile/profile/profile.component';
import { RegisterComponent } from './Components/Account/register/register.component';
import { PlaceCemeteryComponent } from './Components/Services/PlaceCemetery-crud/placeCemetery/placeCemetery.component';
import { AuthGuard } from './Guards/auth.guards';
import { ProfileEditComponent } from './Components/Profile/profile-edit/profile-edit.component';

const routes: Routes = [
  { path: '', component: PlaceCemeteryComponent },
  {
    path: 'account',
    children: [
      { path: '', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'edit', component: ProfileEditComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent }
    ]
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
