import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'src/app/service/application.service';
import jwt_decode from 'jwt-decode';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-cappdetails',
  templateUrl: './cappdetails.component.html',
  styleUrls: ['./cappdetails.component.css']
})
export class CappdetailsComponent {
  application: any; 
  certifiername!:string;
  validFrom!:string;
  expiresIn!:string;
  certificateUrl!:string;
  username!: string;
  rejectReason!:string;
  selectedFile!: File;
  pdfFileCertificate!: File;
  isRejectionReasonModalOpen: boolean = false;
  identificationFile: any; 
  identificationFileUrl: SafeUrl | null = null;

  constructor(private route: ActivatedRoute, private appService: ApplicationService,private router: Router,private sanitizer: DomSanitizer) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.pdfFileCertificate = this.selectedFile;
  }


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const decodedHeader = jwt_decode(token) as { username: string,address: string,place: string,email: string,userType: string; };
      this.username = decodedHeader.username;
    } else {
      console.error('Token not found in localStorage');
    }
    const applicationId = this.route.snapshot.params['id'];
    this.appService.getCApplicationById(applicationId).subscribe(app => {
      this.application = app;
      this.fetchIdentificationFile();
    });
  }
 
  acceptCApplication(): void {
    this.appService.acceptCApplication(this.application._id, this.username)
      .subscribe(updatedApplication => {
        this.application = updatedApplication;
        this.appService.generateCertificate(this.application).subscribe((certificateBlob: Blob) => {
          });
        this.router.navigate(['/capplication']);
      });
  }
        
  rejectCApplication(): void {
    this.appService.rejectCApplication(this.application._id,this.rejectReason)
      .subscribe(updatedApplication => {
        this.application = updatedApplication;
        this.router.navigate(['/capplication']);
        this.isRejectionReasonModalOpen = false;
      });
  }
  openRejectionReasonModal(): void {
    
    this.isRejectionReasonModalOpen = true;
    
  }
  fetchIdentificationFile(): void {
    this.appService.getIdentificationFile(this.application._id).subscribe((data: ArrayBuffer) => {
      const blob = new Blob([new Uint8Array(data)], { type: 'application/pdf' });
      const blobUrl = window.URL.createObjectURL(blob);
      this.identificationFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
    });
  }
}

