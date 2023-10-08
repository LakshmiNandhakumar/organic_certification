import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './include/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ViewApplicationlistComponent } from './pages/users/inspector/view-applicationlist/view-applicationlist.component';
import { InspectorprofileComponent } from './pages/users/inspector/inspectorprofile/inspectorprofile.component';
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
import { TaddComponent } from './pages/users/transporting_company/tadd/tadd.component';
import { TprofileComponent } from './pages/users/transporting_company/tprofile/tprofile.component';
import { RprofileComponent } from './pages/users/retailer/rprofile/rprofile.component';
import { RaddComponent } from './pages/users/retailer/radd/radd.component';
import { CtprofileComponent } from './pages/users/customer/ctprofile/ctprofile.component';
import { FaddFarmDetailsComponent } from './pages/users/farmer/fadd-farm-details/fadd-farm-details.component';
import { FDisplayFieldDetailsComponent } from './pages/users/farmer/f-display-field-details/f-display-field-details.component';
import { FservicesComponent } from './pages/users/farmer/fservices/fservices.component';
import { FaddProductDetailsComponent } from './pages/users/farmer/fadd-product-details/fadd-product-details.component';
import { MProductDisplayComponent } from './pages/users/mill_owner/m-product-display/m-product-display.component';
import { TdisplayComponent } from './pages/users/transporting_company/tdisplay/tdisplay.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { ScanningComponent } from './pages/users/customer/scanning/scanning.component';
import { AppStatusComponent } from './pages/users/farmer/app-status/app-status.component';
import { ServicesComponent } from './pages/services/services.component';
import { AppdisplayfieldsComponent } from './pages/users/farmer/appdisplayfields/appdisplayfields.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    ViewApplicationlistComponent,
    InspectorprofileComponent,
    FprofileComponent,
    FapplicationComponent,
    ViewAppDetailsComponent,
    CprofileComponent,
    CapplicationComponent,
    CappdetailsComponent,
    MapComponent,
    MprofileComponent,
    MproductComponent,
    MaddComponent,
    TaddComponent,
    TprofileComponent,
    RprofileComponent,
    RaddComponent,
    CtprofileComponent,
    FaddFarmDetailsComponent,
    FDisplayFieldDetailsComponent,
    FservicesComponent,
    FaddProductDetailsComponent,
    MProductDisplayComponent,
    TdisplayComponent,
    ScanningComponent,
    AppStatusComponent,
    ServicesComponent,
    AppdisplayfieldsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ZXingScannerModule,
    NgxScannerQrcodeModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
