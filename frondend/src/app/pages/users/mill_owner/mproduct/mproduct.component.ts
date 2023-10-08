import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FieldDetailsService } from 'src/app/service/field-details.service';


@Component({
  selector: 'app-mproduct',
  templateUrl: './mproduct.component.html',
  styleUrls: ['./mproduct.component.css']
})
export class MproductComponent implements OnInit {
  
  productDetails!:any[];
  
  constructor(private fieldService:FieldDetailsService,private router:Router){}
 

  ngOnInit(): void {
    this.fieldService.getAllProducts().subscribe(product=>{
      this.productDetails =product;
    
    });
  }
  viewProductDetails(fieldId: string): void {
    // Navigate to the details page for the selected application
    this.router.navigate(['/viewProductDetails', fieldId]);
  }
   
  }