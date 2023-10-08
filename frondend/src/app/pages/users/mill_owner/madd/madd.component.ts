import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldDetailsService } from 'src/app/service/field-details.service';
import Swal from 'sweetalert2';
import * as JSZip from 'jszip'; 




@Component({
  selector: 'app-madd',
  templateUrl: './madd.component.html',
  styleUrls: ['./madd.component.css']
})
export class MaddComponent {

  qrCodeForm: FormGroup;
  fieldId!: string;
  qrCodeImages: any[] = [];
  productDetails: any;
  // qrCodeFilePaths: string[] = [];
  isDownloadingZIP = false;

  constructor(
    private fb: FormBuilder,
    private fieldService: FieldDetailsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.qrCodeForm = this.fb.group({
      millName: ['', Validators.required],
            millType: ['', Validators.required],
            grading: ['', Validators.required],
            numberOfBags: [1, [Validators.required, Validators.min(1)]],
            bagType: ['', Validators.required],
            status:'milling process',
    });
  }

  ngOnInit() {
    
    this.route.params.subscribe((params) => {
      this.fieldId = params['id']; 
    });
  }
 
generateQRCodes() {
   
    
    this.fieldService.generateQRCodes(this.fieldId, this.qrCodeForm.value).subscribe(
      (response) => {
      
        Swal.fire('Success', 'Successfully added milling details', 'success');
        this.downloadZIP(this.fieldId);
        this.router.navigate(['/mproduct']);
      },
      (error) => {
        Swal.fire('Error', 'Milling details not added!', 'error');
        console.error('Error generating QR codes:', error);
      }
    );
  }
  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  
}

downloadZIP(fieldId: string) {
      if (!this.isDownloadingZIP) {
        this.isDownloadingZIP = true;
  
        Swal.fire({
          title: 'Downloading ZIP',
          text: 'Please wait for the download to complete...',
          icon: 'info',
          allowOutsideClick: false,
          showCancelButton: false,
          showConfirmButton: false,
          showCloseButton: false,
        });
  
        this.fieldService.getQrCodeImages(fieldId).subscribe(
         
          (response: any) => {
            const zip = new JSZip();
            response.qrCodeImages.forEach((image: any) => {
              const imageBlob = this.dataURItoBlob(image.image);
              zip.file(`${image.uniqueToken}.png`, imageBlob);
            });
  
            zip.generateAsync({ type: 'blob' }).then((zipBlob: Blob | MediaSource) => {
              const zipUrl = URL.createObjectURL(zipBlob);
              const a = document.createElement('a');
              a.style.display = 'none';
              a.href = zipUrl;
              a.download = 'qrcodes.zip';
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(zipUrl);
  
              setTimeout(() => {
                this.isDownloadingZIP = false;
    
               
                Swal.close();
                Swal.fire('Success', 'ZIP download completed!', 'success');
              }, 500); 
            });
          },
          (error) => {
            console.error('Error fetching QR codes:', error);
            this.isDownloadingZIP = false;
    
           
            Swal.close();
            Swal.fire('Error', 'An error occurred while downloading the ZIP.', 'error');
          }
        );
      }
    }
  
}
