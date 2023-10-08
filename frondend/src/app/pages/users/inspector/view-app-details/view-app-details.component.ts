import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'src/app/service/application.service';
import jwt_decode from 'jwt-decode';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-view-app-details',
  templateUrl: './view-app-details.component.html',
  styleUrls: ['./view-app-details.component.css']
})
export class ViewAppDetailsComponent {
  application: any; 
  Inspectorname!: string;
  rejectReason!:string;
  uploads: any;
  username!: string;
  isRejectionReasonModalOpen: boolean = false;
  identificationFile: any; 
  identificationFileUrl: SafeUrl | null = null;
 
  constructor(private route: ActivatedRoute, private appService: ApplicationService,private router: Router,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (token !== null) {
      const decodedHeader = jwt_decode(token) as { username: string,address: string,place: string,email: string,userType: string; };
      this.username = decodedHeader.username;
    } else {
      console.error('Token not found in localStorage');
    }
    const applicationId = this.route.snapshot.params['id'];
    this.appService.getApplicationById(applicationId).subscribe(app => {
      this.application = app;
      this.fetchIdentificationFile();
    });
   
  }
  
  acceptApplication(): void {
    this.appService.acceptApplication(this.application._id,this.username)
      .subscribe(updatedApplication => {
        this.application = updatedApplication;
        this.router.navigate(['/viewapplication']);
      });
  }

  rejectApplication(): void {
    this.appService.rejectApplication(this.application._id,this.rejectReason)
      .subscribe(updatedApplication => {
        this.application = updatedApplication;
        this.router.navigate(['/viewapplication']);
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

