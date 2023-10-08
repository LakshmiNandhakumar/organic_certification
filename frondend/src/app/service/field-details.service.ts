import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FieldDetailsService {
  private apiUrl = 'http://localhost:3000/api/field'; 
 
  private scannedQRCodeContentSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  addFarmDetails(fieldData: any): Observable<any> {
        interface FormDataObject {
      [key: string]: string | File; 
    }
    
 
    const formDataObject: FormDataObject = {};
    fieldData.forEach((value: string, key: string | number) => {
      formDataObject[key] = value as string; 
    });


    return this.http.post(`${this.apiUrl}/addFieldDetails`, formDataObject);
  }

  searchfieldId(fieldId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/${fieldId}`);
  }

  getfieldDetails(fieldId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/displayFarmDetails/${fieldId}`);
  }

  addProductDetails(productData: any): Observable<any> {
return this.http.post(`${this.apiUrl}/addProductDetails`, productData);
}



getAllProducts(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/viewproductdetails`);
}

getProductByfieldId(fieldId: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/viewproductdetails/${fieldId}`);
}


generateQRCodes(fieldId: string, data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/mill-details/${fieldId}`, data);
}


getQrCodeFilenames(fieldId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/qrcodes/${fieldId}`);
}

getAllTProducts(): Observable<any[]>{
  return this.http.get<any[]>(`${this.apiUrl}/productdetails`);
}

getQrCodeImages(fieldId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/qrcodes/${fieldId}`);
}

setScannedQRCodeContent(content: string | null): void {
  this.scannedQRCodeContentSubject.next(content);
}
get scannedQRCodeContent(): Observable<string | null> {
  return this.scannedQRCodeContentSubject.asObservable();
}

getDetailsByUniqueToken(token: string): Observable<any> {
  const url = `${this.apiUrl}/getDetailsByToken/?token=${token}`;
  return this.http.get(url);
}

addDetailsByToken(details: any) {
 
  return this.http.post(`${this.apiUrl}/addDetailsByToken`, details);
}

getTQrCodeImages(fieldId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/display/${fieldId}`);
}

getBagDetails(storeName: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/getBagDetailsByStoreName/${storeName}`);
}

getDetailsByUniqueTokenRetailer(token: string): Observable<any> {
  const url = `${this.apiUrl}/getDetailsByTokenRetailer/?token=${token}`;
  return this.http.get(url);
}

addDetailsByTokenRetailer(token: string): Observable<any> {
  const requestBody = { token };
  
  return this.http.post(`${this.apiUrl}/addDetailsByTokenRetailers`, requestBody);
}

getStoreNames(): Observable<string[]> {
  const url = `${this.apiUrl}/stores`; 
  return this.http.get<string[]>(url);
}
getBagsDetails(storeName: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/ctproduct/${storeName}`);
}


}





