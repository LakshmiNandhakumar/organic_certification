import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-inspectorprofile',
  templateUrl: './inspectorprofile.component.html',
  styleUrls: ['./inspectorprofile.component.css']
})
export class InspectorprofileComponent {
  username!: string;
  address!: string;
  place!: string;
  email!: string;
  userType!: string;

  constructor(private router:Router) {}

  ngOnInit(): void {
   
    const token = localStorage.getItem('token');
    if (token !== null) {
      const decodedHeader = jwt_decode(token) as { username: string,address: string,place: string,email: string,userType: string; };
      this.username = decodedHeader.username;
      this.address = decodedHeader.address;
      this.place = decodedHeader.place;
      this.email = decodedHeader.email;
      this.userType=decodedHeader.userType;
    } else {
      console.error('Token not found in localStorage');
    }
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
}
}

