import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldDetailsService } from 'src/app/service/field-details.service';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tdisplay',
  templateUrl: './tdisplay.component.html',
  styleUrls: ['./tdisplay.component.css']
})
export class TdisplayComponent {
 
  fieldId!: string;
  qrCodeImages: any[] = [];
  productDetails: any;
  scannedQRCodeContent: string | null = null;
  isScannerDisabled = false;
  activeTab: 'field-details' | 'product-details' | 'milling-details' = 'field-details';

  constructor(
    private route: ActivatedRoute,
    private fieldService: FieldDetailsService,
    private router:Router
    
  ) {}

  ngOnInit(): void {
    this.fieldService.scannedQRCodeContent.subscribe((content: string | null) => {
      this.scannedQRCodeContent = content;
      if (content) {
       
      
        this.fetchDetailsByUniqueToken(content);
      
      }
    });
    this.route.params.subscribe((params) => {
      this.fieldId = params['id'];
    });}

    fetchDetailsByUniqueToken(uniqueToken: string): void {
    
      this.fieldService.getDetailsByUniqueToken(uniqueToken).subscribe(
        (details: any) => {
          this.productDetails = details;
        },
        (error) => {
          console.error('Error fetching details:', error);
        }
      );
    
  }

 
  startScanning(): void {
    this.scannedQRCodeContent = null;
    this.isScannerDisabled = false;
  }

  
  stopScanning(): void {
   
    this.scannedQRCodeContent = null;
    this.isScannerDisabled = true;
  }

  onScanSuccess(resultString: string): void {
    this.fieldService.setScannedQRCodeContent(resultString);
  }
  
}
