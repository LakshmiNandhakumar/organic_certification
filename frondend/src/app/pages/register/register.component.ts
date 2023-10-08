import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  username!: string;
  address!: string;
  place!: string;
  email!: string;
  password!: string;
  userType: string = 'select';
  storeName!:string;
  buildingname!:string;
  buildingnum!:string;
  message: string = '';
  className = 'd-none';
  isProcess: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  register(username: string, address: string, place: string, email: string, password: string, userType: string,storeName:string,buildingname:string,buildingnum:string) {
    this.isProcess = true;
    this.authService.register(username, address, place, email, password, userType,storeName,buildingname,buildingnum).subscribe(
      (res) => {
        if (res.success) {
          Swal.fire('success','Registration Successfull','success');
          this.isProcess = false;
          this.message = "Registration Successfull";
          this.className = 'alert alert-success';
          this.router.navigate(['/login']);
        }
        else {
          this.isProcess = false;
          this.message = res.message;
          this.className = 'alert alert-danger';
          Swal.fire('error','Registration unsuccessful','error');
        }
      },
      (error) => {
        this.isProcess = false;
        this.message = "Please provide below details!";
        this.className = 'alert alert-danger';
        Swal.fire('error','Please provide below details!','error');

      }
    );
  }
}


