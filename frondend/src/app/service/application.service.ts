import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { jsPDF } from 'jspdf';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl = 'http://localhost:3000/api/application';

  constructor(private http: HttpClient) { }

  submitApplication(applicationData: any): Observable<any> { 
    return this.http.post(`${this.apiUrl}/applicationsubmit`,applicationData );
  }


  getAllApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/viewApplication`);
  }

  getApplicationById(applicationId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/viewApplication/${applicationId}`);
  }

  acceptApplication(applicationId: string, Inspectorname: string): Observable<any> {
    const data = {
      Inspectorname: Inspectorname
    };
    return this.http.put<any>(`${this.apiUrl}/viewApplication/accept/${applicationId}`, data);
  }

  rejectApplication(applicationId: string, rejectReason: string): Observable<any> {
    const data = {
      rejectReason: rejectReason,
    };
    return this.http.put<any>(`${this.apiUrl}/viewApplication/reject/${applicationId}`, data);
  }


  getSubmittedApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/certifierView`);
  }

  getCApplicationById(applicationId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cviewapplication/${applicationId}`);
  }

  acceptCApplication(applicationId: string, certifiername: string): Observable<any> {
    const data = {
      certifiername: certifiername,
    };
    return this.http.put<any>(`${this.apiUrl}/cviewapplication/accept/${applicationId}`, data);
  }

  rejectCApplication(applicationId: string, rejectReason: string): Observable<any> {
    const data = {
      rejectReason: rejectReason,
    };
    return this.http.put<any>(`${this.apiUrl}/cviewapplication/reject/${applicationId}`, data);
  }

  searchfieldId(fieldId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/${fieldId}`);
  }

  getfieldDetails(fieldId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/appDisplayFarmDetails/${fieldId}`);
  }

  appStatus(farmerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/appStatus/${farmerId}`);
  }

  generateCertificate(data: any): Observable<Blob> {
    const doc = new jsPDF();

    doc.setFontSize(30);
    doc.setFont('helvetica', 'bold');

    doc.text('Certification of Compliance', 35, 40);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal'); 


  
    const x = 20; 
    const y = 60; 
    const maxWidth = 230; 

    
    const paragraphText = `
    This is to certify that the field of number '${data.applicationDetails.fieldId}' is located at the geolocation of '${data.applicationDetails.latitude}'\n
    and '${data.applicationDetails.longitude}' has Certified as ORGANIC.With the certification of '${data.applicationDetails.standard}' standard.Field has\n
    '${data.applicationDetails.cropType}' crop is harvested with the protection methods of '${data.protection}' with the extend of \n
    '${data.extend}'.This field has been inspected by '${data.InspectionDetails.inspectorname} at '${data.InspectionDetails.InspectionDate}''assessed \n
    and found to comply with the requirement of Certified as Organic.
`;

    const imageUrl = '../../../../../assets/images/certifiedLogo.jpg'; 
    doc.addImage(imageUrl, 'JPEG', 30, 130, 50, 50); 
    doc.text(paragraphText, x, y, { maxWidth });

    doc.text(`Certified By: ${data.certificationDetails.certifiername}`, 30, 200);
    doc.text(`Certification Date: ${data.certificationDetails.certificationDate}`, 30, 210);

    doc.text(`Certificate Valid from : ${data.certificationDetails.validFrom}`, 120, 200);
    doc.text(`Certificate expired In : ${data.certificationDetails.expiresIn}`, 120, 210);


    
    const certificateBlob = doc.output('blob');
    return new Observable((observer) => {
      observer.next(certificateBlob);
      observer.complete();
    });
  }

  saveCertificateUrlToDatabase(applicationId: string, certificateUrl: string, certificateName: string): Observable<any> {
    const certificateData = { applicationId, certificateUrl, certificateName };
    return this.http.post(`${this.apiUrl}/saveCertificate`, certificateData);
  }


  getIdentificationFile(applicationId: string): Observable<ArrayBuffer> {
    const url = `${this.apiUrl}/applications/${applicationId}/identification-file`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  getMapApiKey() {
    return this.http.get<{ mapApiKey: string }>('/map-key');
  }
 
} 



