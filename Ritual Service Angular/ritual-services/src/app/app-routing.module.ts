import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Account/login/login.component';
import { ProfileComponent } from './Components/Profile/profile/profile.component';
import { RegisterComponent } from './Components/Account/register/register.component';
import { PlaceCemeteryComponent } from './Components/Services/PlaceCemetery-crud/placeCemetery/placeCemetery.component';
import { AuthGuard } from './Guards/auth.guards';
import { ProfileEditComponent } from './Components/Profile/profile-edit/profile-edit.component';
import { ServiceComponent } from './Components/Services/service/service.component';
import { AfterFuneralServiceComponent } from './Components/Services/afterFuneralService/afterFuneralService.component';
import { FarewellHallComponent } from './Components/Services/farewellHall/farewellHall.component';
import { OrganizationMemorialServiceComponent } from './Components/Services/organizationMemorialService/organizationMemorialService.component';
import { PreparationDeceasedComponent } from './Components/Services/preparationDeceased/preparationDeceased.component';
import { RentalRitualAccessoriesComponent } from './Components/Services/rentalRitualAccessories/rentalRitualAccessories.component';
import { RitualAgentComponent } from './Components/Services/ritualAgent/ritualAgent.component';
import { SupportCrewsComponent } from './Components/Services/supportCrews/supportCrews.component';
import { PlaceCemeteryAddComponent } from './Components/Services/PlaceCemetery-crud/placeCemetery-add/placeCemetery-add.component';
import { PlaceCemeteryUpdateComponent } from './Components/Services/PlaceCemetery-crud/placeCemetery-update/placeCemetery-update.component';
import { FuneralsComponent } from './Components/Services/Funeral/funerals/funerals.component';
import { TransportationDeceasedComponent } from './Components/Services/transportationDeceased/transportationDeceased.component';
import { RitualStuffComponent } from './Components/Shop/Ritual-Stuff/Ritual-Stuff.component';
import { CrossesComponent } from './Components/Shop/Crosses/Crosses.component';
import { CoffinsComponent } from './Components/Shop/Coffins/Coffins.component';
import { MemorialComponent } from './Components/Shop/Memorial/Memorial.component';
import { UrnsComponent } from './Components/Shop/Urns/Urns.component';
import { WreathsComponent } from './Components/Shop/Wreaths/Wreaths.component';
import { ShopComponent } from './Components/Shop/Shop/Shop.component';
import { AboutComponent } from './Components/About/About/About.component';
import { ContactComponent } from './Components/Contact/contact/contact.component';
import { HomeComponent } from './Components/home/home.component';
import { CivilFuneralsComponent } from './Components/Services/Funeral/civilFunerals/civilFunerals.component';
import { EliteFuneralsComponent } from './Components/Services/Funeral/eliteFunerals/eliteFunerals.component';
import { JewishFuneralsComponent } from './Components/Services/Funeral/jewishFunerals/jewishFunerals.component';
import { MilitaryFuneralsComponent } from './Components/Services/Funeral/militaryFunerals/militaryFunerals.component';
import { MuslimFuneralsComponent } from './Components/Services/Funeral/muslimFunerals/muslimFunerals.component';
import { OrthodoxFuneralsComponent } from './Components/Services/Funeral/orthodoxFunerals/orthodoxFunerals.component';
import { DinnerComponent } from './Components/Restaurants/funeral dinner/dinner/dinner.component';
import { MenuComponent } from './Components/Restaurants/funeral menu/menu/menu.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  { path: '', component: PlaceCemeteryComponent },
  {
    path: 'account',
    children: [
      { path: '', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'edit', component: ProfileEditComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path:'restaurant',
    children:[
      {path:'funeral-dinner',component:DinnerComponent},
      {path:'funeral-menu',component:MenuComponent}
    ]
  },
  {
    path: 'service',
    children: [
      { path: '', component: ServiceComponent},
      { path: 'after-funeral', component: AfterFuneralServiceComponent},
      { path: 'farewel-hall', component: FarewellHallComponent },
      { path: 'org-memorial', component: OrganizationMemorialServiceComponent },
      { path: 'prep-deceased', component: PreparationDeceasedComponent},
      { path: 'rental-ritual-acces', component: RentalRitualAccessoriesComponent},
      { path: 'ritual-agent', component: RitualAgentComponent },
      { path: 'suport-crew', component: SupportCrewsComponent},
      { path: 'transport-deceased', component: TransportationDeceasedComponent},
      {path: 'place-cemetery',
      children: [
        { path: '', component: PlaceCemeteryComponent },
        { path: 'add', component: PlaceCemeteryAddComponent },
        { path: 'edit', component: PlaceCemeteryUpdateComponent }
      ]},
      {path: 'funeral',
      children: [
        { path: '', component: FuneralsComponent },
        { path: 'civil', component: CivilFuneralsComponent },
        { path: 'elite', component: EliteFuneralsComponent },
        { path: 'jewish', component: JewishFuneralsComponent },
        { path: 'military', component: MilitaryFuneralsComponent },
        { path: 'muslim', component: MuslimFuneralsComponent },
        { path: 'orthodox', component: OrthodoxFuneralsComponent }
      ]}
    ]
  },
      {path: 'shop',
      children: [
        { path: '', component: ShopComponent },
        { path: 'ritual-stuff', component: RitualStuffComponent },
        { path: 'crosses', component: CrossesComponent },
        { path: 'coffins', component: CoffinsComponent },
        { path: 'memorial', component: MemorialComponent },
        { path: 'urns', component: UrnsComponent },
        { path: 'wreaths', component: WreathsComponent }
      ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
