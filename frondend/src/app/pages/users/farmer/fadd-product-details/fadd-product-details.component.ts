import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldDetailsService } from 'src/app/service/field-details.service';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fadd-product-details',
  templateUrl: './fadd-product-details.component.html',
  styleUrls: ['./fadd-product-details.component.css']
})
export class FaddProductDetailsComponent implements OnInit{
farmerId!:string;
 fieldId!: string;
 riceType!: string;
 duration!:string;
 quantity!:number;
 validationMessage: string = '';

 constructor(private route: ActivatedRoute,private fieldService: FieldDetailsService,private router:Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
  if (token !== null) {
    const decodedHeader = jwt_decode(token) as { userId: string };
    this.farmerId = decodedHeader.userId;
  } else {
    console.error('Token not found in localStorage');
  }
  this.route.params.subscribe(params => {
    this.fieldId = params['id'];
  });
}

      onAddProduct() {
      if (this.isFormValid()) {
        const data = {
          farmerId: this.farmerId,
          fieldId: this.fieldId,
          riceType: this.riceType,
          duration: this.duration,
          quantity: this.quantity,
        
        };
    
        this.fieldService.addProductDetails(data).subscribe(
          (response) => {
            Swal.fire('Success!', 'Added Product details Successfully!', 'success');
            // alert("Added Product details Successfully");
            this.router.navigate(['/fservices']);
          },
          (error) => {
            Swal.fire('Error!', 'Error in adding product details!', 'error');
            // alert(`Error in adding product details`);
          }
        );
      }
    }
    isFormValid(): boolean {
      const isriceTypeValid = !!this.riceType;
      const isdurationValid = !!this.duration;
      const isquantityValid = !!this.quantity !== null;
     
      if (

        isriceTypeValid &&
        isdurationValid &&
        isquantityValid 
       
        
      ) {
        this.validationMessage = ''; 
        return true;
      } else {
        this.validationMessage = 'Please fill all the fields.';
        return false;
      }
    }
  }