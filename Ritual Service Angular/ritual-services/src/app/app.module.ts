import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './Components/Profile/profile/profile.component';
import { RegisterComponent } from './Components/Account/register/register.component';
import { LoginComponent } from './Components/Account/login/login.component';
import { NavBarComponent } from './Components/Nav-Bar/Nav-Bar.component';
import { PlaceCemeteryComponent } from './Components/Services/PlaceCemetery-crud/placeCemetery/placeCemetery.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { HttpClientModule } from '@angular/common/http';
import { ProfileEditComponent } from './Components/Profile/profile-edit/profile-edit.component';
import { AfterFuneralServiceComponent } from './Components/Services/afterFuneralService/afterFuneralService.component';
import { FarewellHallComponent } from './Components/Services/farewellHall/farewellHall.component';
import { OrganizationMemorialServiceComponent } from './Components/Services/organizationMemorialService/organizationMemorialService.component';
import { PreparationDeceasedComponent } from './Components/Services/preparationDeceased/preparationDeceased.component';
import { RentalRitualAccessoriesComponent } from './Components/Services/rentalRitualAccessories/rentalRitualAccessories.component';
import { RitualAgentComponent } from './Components/Services/ritualAgent/ritualAgent.component';
import { SupportCrewsComponent } from './Components/Services/supportCrews/supportCrews.component';
import { PlaceCemeteryAddComponent } from './Components/Services/PlaceCemetery-crud/placeCemetery-add/placeCemetery-add.component';
import { PlaceCemeteryUpdateComponent } from './Components/Services/PlaceCemetery-crud/placeCemetery-update/placeCemetery-update.component';
import { CivilFuneralsComponent } from './Components/Services/Funeral/civilFunerals/civilFunerals.component';
import { EliteFuneralsComponent } from './Components/Services/Funeral/eliteFunerals/eliteFunerals.component';
import { FuneralsComponent } from './Components/Services/Funeral/funerals/funerals.component';
import { JewishFuneralsComponent } from './Components/Services/Funeral/jewishFunerals/jewishFunerals.component';
import { MilitaryFuneralsComponent } from './Components/Services/Funeral/militaryFunerals/militaryFunerals.component';
import { MuslimFuneralsComponent } from './Components/Services/Funeral/muslimFunerals/muslimFunerals.component';
import { OrthodoxFuneralsComponent } from './Components/Services/Funeral/orthodoxFunerals/orthodoxFunerals.component';
import { ServiceComponent } from './Components/Services/service/service.component';
import { TransportationDeceasedComponent } from './Components/Services/transportationDeceased/transportationDeceased.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CoffinsComponent } from './Components/Shop/Coffins/Coffins.component';
import { CrossesComponent } from './Components/Shop/Crosses/Crosses.component';
import { MemorialComponent } from './Components/Shop/Memorial/Memorial.component';
import { RitualStuffComponent } from './Components/Shop/Ritual-Stuff/Ritual-Stuff.component';
import { ShopComponent } from './Components/Shop/Shop/Shop.component';
import { UrnsComponent } from './Components/Shop/Urns/Urns.component';
import { WreathsComponent } from './Components/Shop/Wreaths/Wreaths.component';
import { AboutComponent } from './Components/About/About/About.component';
import { ContactComponent } from './Components/Contact/contact/contact.component';
import { DinnerComponent } from './Components/Restaurants/funeral dinner/dinner/dinner.component';
import { MenuComponent } from './Components/Restaurants/funeral menu/menu/menu.component';

const customNotifierOptions: NotifierOptions = {
  position: { horizontal: { position: 'right' }, vertical: { position: 'top' } }
};

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    NavBarComponent,
    PlaceCemeteryComponent,
    ProfileEditComponent,
    ServiceComponent,
    AfterFuneralServiceComponent,
    FarewellHallComponent,
    OrganizationMemorialServiceComponent,
    PreparationDeceasedComponent,
    RentalRitualAccessoriesComponent,
    RitualAgentComponent,
    SupportCrewsComponent,
    PlaceCemeteryAddComponent,
    PlaceCemeteryUpdateComponent,
    CivilFuneralsComponent,
    EliteFuneralsComponent,
    FuneralsComponent,
    JewishFuneralsComponent,
    MilitaryFuneralsComponent,
    MuslimFuneralsComponent,
    OrthodoxFuneralsComponent,
    TransportationDeceasedComponent,
    CoffinsComponent,
    CrossesComponent,
    MemorialComponent,
    RitualStuffComponent,
    ShopComponent,
    UrnsComponent,
    WreathsComponent,
    AboutComponent,
    ContactComponent,
    DinnerComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    NgxSpinnerModule,
    NotifierModule.withConfig(customNotifierOptions),
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class AppModule { }
