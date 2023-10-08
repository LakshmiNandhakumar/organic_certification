import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldDetailsService } from 'src/app/service/field-details.service';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-radd',
  templateUrl: './radd.component.html',
  styleUrls: ['./radd.component.css']
})
export class RaddComponent {
 
  fieldId!: string;
  qrCodeImages: any[] = [];
  productDetails: any;
  scannedQRCodeContent: string | null = null;
  isScannerDisabled = false;
  activeTab: 'field-details' | 'product-details' | 'milling-details' | 'transporting-details' = 'field-details';

  constructor(
    
    private fieldService: FieldDetailsService,
    private router:Router
    
  ) {}

  ngOnInit(): void {
    this.fieldService.scannedQRCodeContent.subscribe((content: string | null) => {
      this.scannedQRCodeContent = content;
      if (content) {
      
      
        this.fetchDetailsByUniqueToken(content);
       
        this.addDetails(content);
      }
    });
  }

    fetchDetailsByUniqueToken(uniqueToken: string): void {
   
      this.fieldService.getDetailsByUniqueTokenRetailer(uniqueToken).subscribe(
        (details: any) => {
          this.productDetails = details;
        
          Swal.fire('Success', 'Successfully scanned it', 'success');
        
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

  addDetails(scannedQRCodeContent:string) {
    this.fieldService.addDetailsByTokenRetailer(scannedQRCodeContent)
      .subscribe(
        (response) => {
          
          this.router.navigate(['/radd']);
        },
        (error) => {
          console.error('Error adding details:', error);
          
        }
      );
  }
  
}