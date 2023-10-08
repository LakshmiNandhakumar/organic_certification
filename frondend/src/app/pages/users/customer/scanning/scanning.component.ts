import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldDetailsService } from 'src/app/service/field-details.service';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-scanning',
  templateUrl: './scanning.component.html',
  styleUrls: ['./scanning.component.css']
})
export class ScanningComponent {
  fieldId!: string;
  qrCodeImages: any[] = [];
  productDetails: any;
  scannedQRCodeContent: string | null = null;
  isScannerDisabled = false;
  activeTab: 'field-details' | 'product-details' | 'milling-details' | 'transporting-details' = 'field-details';

  constructor(
    
    private fieldService: FieldDetailsService,
    
  ) {}

  ngOnInit(): void {
    this.fieldService.scannedQRCodeContent.subscribe((content: string | null) => {
      this.scannedQRCodeContent = content;
      if (content) {
        this.fetchDetailsByUniqueToken(content);
      }
    });
  }

    fetchDetailsByUniqueToken(uniqueToken: string): void {
      this.fieldService.getDetailsByUniqueTokenRetailer(uniqueToken).subscribe(
        (details: any) => {
          this.productDetails = details;
          Swal.fire('Success', 'Successfully get the product details', 'success');
          // this.router.navigate(['/tadd',uniqueToken]);
        },
        (error) => {
          console.error('Error fetching details:', error);
        }
      );
    
  }

 
  startScanning(): void {
    // Set the scanned QR code content to null initially
    this.scannedQRCodeContent = null;

    // Enable the scanner by setting isScannerDisabled to false
    this.isScannerDisabled = false;
  }

  // Function to stop scanning QR codes
  stopScanning(): void {
    // Set the scanned QR code content to null when stopping
    this.scannedQRCodeContent = null;

    // Disable the scanner by setting isScannerDisabled to true
    this.isScannerDisabled = true;
  }

  onScanSuccess(resultString: string): void {
    this.fieldService.setScannedQRCodeContent(resultString);
  }
  
}


