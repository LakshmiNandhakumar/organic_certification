import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';
  constructor(private http: HttpClient){}
  private userData: any; 
   

register(username:string,address:string,place:string,email: string, password: string, userType: string,storeName:string,buildingname:string,buildingnum:string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      username,
      address,
      place,
      email,
      password,
      userType,
      storeName,
      buildingname,
      buildingnum
    });
  }

  
loginUser(email: string, password: string): Observable<any> {
  const loginUrl = `${this.apiUrl}/login`; 
  const fields = { email, password }; 

  return this.http.post(loginUrl, fields);
}


  setToken(token: string): void {
  localStorage.setItem('token', token);
  }

  
}

  