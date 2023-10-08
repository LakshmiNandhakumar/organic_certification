import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  email: string = '';
  password: string = '';
  message: string = '';
  className = 'd-none';
  isProcess: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  login() {

    this.auth.loginUser(this.email, this.password).subscribe(
      (res) => {
        if (res.success && res.token) {
          localStorage.setItem('token', res.token);
          const token = res.token;
          const decodedHeader = jwt_decode(token) as { userType: String };
          const userType = decodedHeader.userType;
          

          if (userType === 'farmer') {
            this.router.navigate(['/fservices']);
          } 
          else if (userType === 'inspector') {
            this.router.navigate(['/viewapplication']);
          } 
          else if (userType === 'certifier') {
            this.router.navigate(['/capplication']);
          } 
          else if (userType === 'mill_owner') {
            this.router.navigate(['/mproduct']);
          } 
          else if (userType === 'transporting_company') {
            this.router.navigate(['/tqrcodes']);
          } 
          else if (userType === 'retailer') {
            this.router.navigate(['/radd']);
          } 
          else if (userType === 'customer') {
            this.router.navigate(['/scan']);
          } 
          else {
            console.error('Unknown user type');
          }
        } else {
          this.isProcess = false;
          this.message = res.message;
          this.className = 'alert alert-danger';
        }
      },
      (error) => {
        Swal.fire('error','Login unsuccessful','error');
        console.error('Login error', error);
      }
    );
  }
}

