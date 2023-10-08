import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldDetailsService } from 'src/app/service/field-details.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tadd',
  templateUrl: './tadd.component.html',
  styleUrls: ['./tadd.component.css']
})
export class TaddComponent  {
  uniqueToken: string = '';
  companyId: string = '';
      from:  string = '';
      to: string = '';
      storeName='';
      bagstatus!:'delivered';
  companyName: string = '';
  storeNames: string[] = [];


  constructor(private fieldService: FieldDetailsService, private route: ActivatedRoute,private router:Router) {}
  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.uniqueToken = params['token']; 
      this.fieldService.getStoreNames().subscribe((names) => {
        this.storeNames = names;
      });
    });
  }
  addDetails() {
    const details = {
      token: this.uniqueToken,
      companyId: this.companyId,
      companyName: this.companyName,
      storeName: this.storeName,
      from :this.from,
      to :this.to,
    
      
    };

    this.fieldService.addDetailsByToken(details).subscribe(
      (response: any) => {
      
        Swal.fire('Success', 'Successfully added transporting details', 'success');
        this.router.navigate(['/tqrcodes'])
       
      },
      (error) => {
        console.error('Error adding details:', error);
       
      }
    );
  }
  clearStoreNameSelection(): void {
    this.storeName = ''; 
  }
}
  