import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'src/app/service/application.service';
import { FieldDetailsService } from 'src/app/service/field-details.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-fservices',
  templateUrl: './fservices.component.html',
  styleUrls: ['./fservices.component.css']
})
export class FservicesComponent {
  searchInput!: string;
  userId!: string;
  farmerId!: string;
  application: any = null;
  displayCertificate: boolean = false; 
  certificateUrl: SafeResourceUrl = '';
  displayCertificateDialog: boolean = true;
  url!:string;

  constructor(private appService: ApplicationService,private router:Router,private fieldService: FieldDetailsService,private sanitizer: DomSanitizer) 
{}

ngOnInit(): void {

  const token = localStorage.getItem('token');
  if (token !== null) {
    const decodedHeader = jwt_decode(token) as {userId: string };
    this.farmerId = decodedHeader.userId;
  } else {
    console.error('Token not found in localStorage');
  }
}
 
  search(): void {
    this.appService.searchfieldId(this.searchInput)
      .subscribe(
        (data) => {
          this.application = data; 
          Swal.fire('Success!', 'Field Id is found!', 'success');
          if (this.application.applicationStatus === 'Certified') {
            this.displayCertificate = true;
            this.downloadCertificate();
            this.router.navigate(['/faddProductDetails',this.searchInput]);
          } else {
            Swal.fire('Success!', 'Field Id is found!', 'success');
            this.displayCertificate = false;
            this.router.navigate(['/appdisplayfield',this.searchInput]);
          }
        },
        (error) => {
          this.checkSecondService();
          console.error(error);
        }
      );
      }
      checkSecondService(): void {
      this.fieldService.searchfieldId(this.searchInput)
      .subscribe(
        (data) => {
          this.application = data; 
          Swal.fire('Success!', 'Field Id is found!', 'success');
          this.router.navigate(['/fdisplayFarmDetails',this.searchInput]);
        },
        (error) => {
          Swal.fire('Error!', 'Field Id is not found!', 'error');
          this.router.navigate(['/faddFarmDetails',this.searchInput]);
          console.error(error);
        }
      );
  }
  
  downloadCertificate() {
    {
      if (
        (this.application.applicationStatus === 'Certified') &&
        (this.application.applicationStatus !== 'Rejected')
      ){
        this.appService.generateCertificate(this.application).subscribe((certificateBlob: Blob) => {
          const certificateUrl = URL.createObjectURL(certificateBlob);
          this.certificateUrl = this.sanitizer.bypassSecurityTrustResourceUrl(certificateUrl);
          window.open(certificateUrl, '_blank');
        });
      }
      
    }
  }
}



