import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ApplicationService } from 'src/app/service/application.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fapplication',
  templateUrl: './fapplication.component.html',
  styleUrls: ['./fapplication.component.css']
})
export class FapplicationComponent {
  pdfFile!: File;
  farmerId!: string;
  username!: string;
  address!: string;
  place!: string;
  fieldId!: string;
  latitude!: string;
  longitude!: string;
  standard!: string;
  cropType!: string;
  extend!: string;
  manure!: string;
  protection!: string;
  soilType!: string;
  prevCrop!: string;
  measures!: string;
  seedSource!: string;
  applicationStatus!:string;
  selectedFile!: File;
  
  constructor(private appService: ApplicationService, private router: Router) { }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.pdfFile = this.selectedFile;
  }

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
  }

  onSubmit() {

    const formData = new FormData();
    formData.append('username', this.address);
    formData.append('address', this.address);
    formData.append('place', this.place);
    formData.append('farmerId', this.farmerId);
    formData.append('fieldId', this.fieldId);
    formData.append('latitude', this.latitude);
    formData.append('longitude', this.longitude);
    formData.append('standard', this.standard);
    formData.append('cropType', this.cropType);
    formData.append('extend', this.extend);
    formData.append('manure', this.manure);
    formData.append('protection', this.protection);
    formData.append('soilType', this.soilType);
    formData.append('prevCrop', this.prevCrop);
    formData.append('measures', this.measures);
    formData.append('seedSource', this.seedSource);
    formData.append('pdfFile',this.pdfFile, this.pdfFile.name);
    formData.append('applicationStatus', 'Application Submitted');

    const formDataObject: any = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    this.appService.submitApplication(formData).subscribe(
      (res) => {
          Swal.fire('success','Application Submitted Successfully','success');
          this.router.navigate(['/fservices']);
        },

      (error) => {
        Swal.fire('error','Application submission failed','error');
        console.error('HTTP request error:', error);
      }
    );
  }
}