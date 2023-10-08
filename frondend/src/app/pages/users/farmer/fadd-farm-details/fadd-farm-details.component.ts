import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { FieldDetailsService } from 'src/app/service/field-details.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fadd-farm-details',
  templateUrl: './fadd-farm-details.component.html',
  styleUrls: ['./fadd-farm-details.component.css']
})
export class FaddFarmDetailsComponent implements OnInit {

  farmerId!: string;
  username!: string;
  address!: string;
  place!: string;
  fieldId!: string;
  latitude!: string;
  longitude!: string;
  cropType!: string;
  certified!:string;
  searchInput: any;
  validationMessage: string = '';

  constructor(private route: ActivatedRoute,private fieldService: FieldDetailsService,private router:Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const decodedHeader = jwt_decode(token) as { username: string, address: string, place: string, userId: string };
      this.username = decodedHeader.username;
      this.address = decodedHeader.address;
      this.place = decodedHeader.place;
      this.farmerId = decodedHeader.userId;
    } else {
      console.error('Token not found in localStorage');
    }
    this.route.params.subscribe(params => {
      this.searchInput = params['id'];
    });
  }
  onSubmit() {
    if (this.isFormValid()) {
      const formData = new FormData();
      formData.append('farmerId', this.farmerId);
      formData.append('username', this.username);
      formData.append('address', this.address);
      formData.append('place', this.place);
      formData.append('fieldId', this.searchInput);
      formData.append('latitude', this.latitude);
      formData.append('longitude', this.longitude);
      formData.append('cropType', this.cropType);
      formData.append('certified', this.certified);

      this.fieldService.addFarmDetails(formData).subscribe(
        (res) => {
          Swal.fire('Success!', 'Farm details added successfully!', 'success');
          this.router.navigate(['/faddProductDetails',this.searchInput]);
        },
        (error) => {
          Swal.fire('Error!', 'Farm details not added!', 'error');
          console.error('Details not added', error);
        }
      );
    }
  }

isFormValid(): boolean {
  const isLatitudeValid = !!this.latitude;
  const isLongitudeValid = !!this.longitude;
  const isCropTypeValid = !!this.cropType;
  const isCertifiedValid = !!this.certified !== null;
 
  if (
    isLatitudeValid &&
    isLongitudeValid &&
    isCropTypeValid &&
    isCertifiedValid 
    
  ) {
    this.validationMessage = ''; 
    return true;
  } else {
    this.validationMessage = 'Please fill all the fields.';
    return false;
  }
}
}



