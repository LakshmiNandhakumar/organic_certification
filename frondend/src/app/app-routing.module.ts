import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

import { InspectorprofileComponent } from './pages/users/inspector/inspectorprofile/inspectorprofile.component';
import { ViewApplicationlistComponent } from './pages/users/inspector/view-applicationlist/view-applicationlist.component';

import { FprofileComponent } from './pages/users/farmer/fprofile/fprofile.component';
import { FapplicationComponent } from './pages/users/farmer/fapplication/fapplication.component';
import { ViewAppDetailsComponent } from './pages/users/inspector/view-app-details/view-app-details.component';
import { CprofileComponent } from './pages/users/certifier/cprofile/cprofile.component';
import { CapplicationComponent } from './pages/users/certifier/capplication/capplication.component';
import { CappdetailsComponent } from './pages/users/certifier/cappdetails/cappdetails.component';
import { MapComponent } from './pages/users/certifier/map/map.component';
import { MprofileComponent } from './pages/users/mill_owner/mprofile/mprofile.component';
import { MproductComponent } from './pages/users/mill_owner/mproduct/mproduct.component';
import { MaddComponent } from './pages/users/mill_owner/madd/madd.component';
import { TprofileComponent } from './pages/users/transporting_company/tprofile/tprofile.component';
import { TaddComponent } from './pages/users/transporting_company/tadd/tadd.component';
import { RprofileComponent } from './pages/users/retailer/rprofile/rprofile.component';
import { RaddComponent } from './pages/users/retailer/radd/radd.component';
import { CtprofileComponent } from './pages/users/customer/ctprofile/ctprofile.component';
import { FaddFarmDetailsComponent } from './pages/users/farmer/fadd-farm-details/fadd-farm-details.component';
import { FDisplayFieldDetailsComponent } from './pages/users/farmer/f-display-field-details/f-display-field-details.component';
import { FservicesComponent } from './pages/users/farmer/fservices/fservices.component';
import { FaddProductDetailsComponent } from './pages/users/farmer/fadd-product-details/fadd-product-details.component';
import { MProductDisplayComponent } from './pages/users/mill_owner/m-product-display/m-product-display.component';
import { TdisplayComponent } from './pages/users/transporting_company/tdisplay/tdisplay.component';
import { ScanningComponent } from './pages/users/customer/scanning/scanning.component';
import { AppStatusComponent } from './pages/users/farmer/app-status/app-status.component';
import { ServicesComponent } from './pages/services/services.component';
import { AppdisplayfieldsComponent } from './pages/users/farmer/appdisplayfields/appdisplayfields.component';




const routes: Routes = [

  {path:'about',component:AboutComponent},
  {path:'ourService',component:ServicesComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'fservices',component:FservicesComponent},
  {path:'fprofile',component:FprofileComponent},
  {path:'fapplication',component:FapplicationComponent},
  {path:'faddFarmDetails/:id',component:FaddFarmDetailsComponent},
  {path:'fdisplayFarmDetails/:id',component:FDisplayFieldDetailsComponent},
  {path:'appdisplayfield/:id',component:AppdisplayfieldsComponent},
  {path:'faddProductDetails/:id',component:FaddProductDetailsComponent},
  {path:'application-status/:id', component:AppStatusComponent },
  {path:'inspectorprofile',component:InspectorprofileComponent},
  {path:'viewapplication',component:ViewApplicationlistComponent},
  {path:'viewapplication/:id',component:ViewAppDetailsComponent},
  {path:'mprofile',component:MprofileComponent},
  {path:'mproduct',component:MproductComponent},
  {path:'madd/:id',component:MaddComponent},
  {path:'viewProductDetails/:id',component:MProductDisplayComponent},
  {path:'tprofile',component:TprofileComponent},
  {path:'tadd/:token',component:TaddComponent},
  {path:'tqrcodes',component:TdisplayComponent},
  {path:'rprofile',component:RprofileComponent},
  {path:'radd',component:RaddComponent},
  {path:'ctprofile',component:CtprofileComponent},
  {path:'scan',component:ScanningComponent},
  {path:'cprofile',component:CprofileComponent},
  {path:'capplication',component:CapplicationComponent},
  {path:'cviewapplication/:id',component:CappdetailsComponent},
  {path:'map/:id',component:MapComponent}, 
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
