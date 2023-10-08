import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-rprofile',
  templateUrl: './rprofile.component.html',
  styleUrls: ['./rprofile.component.css']
})
export class RprofileComponent {
  username!: string;
  address!: string;
  place!: string;
  email!: string;
  userType!: string;
  storeName!:string;

  constructor(private router:Router) {}

  ngOnInit(): void {
   
    const token = localStorage.getItem('token');
    if (token !== null) {
      const decodedHeader = jwt_decode(token) as { username: string,address: string,place: string,email: string,userType: string,storeName: string };
     
      this.username = decodedHeader.username;
      this.address = decodedHeader.address;
      this.place = decodedHeader.place;
      this.email = decodedHeader.email;
      this.userType=decodedHeader.userType;
      this.storeName=decodedHeader.storeName
    } else {
      console.error('Token not found in localStorage');
    }
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
}
}


