import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiKeyService } from 'src/app/service/api-key.service';
import { FieldDetailsService } from 'src/app/service/field-details.service';
declare let L: any; 

@Component({
  selector: 'app-f-display-field-details',
  templateUrl: './f-display-field-details.component.html',
  styleUrls: ['./f-display-field-details.component.css']
})
export class FDisplayFieldDetailsComponent {
map: any;
  application: any;
  marker: any;
  fieldId!: string;
  fieldDetails: any;
  constructor(private route: ActivatedRoute, private fieldService: FieldDetailsService,private apiKeyService: ApiKeyService) { }
  ngOnInit(): void {

    const fieldId = this.route.snapshot.params['id'];
    this.fieldService.getfieldDetails(fieldId).subscribe(app => {
      this.fieldDetails = app;
      
      const apiKey = this.apiKeyService.getApiKey();
      L.mapquest.key = apiKey;

        this.map = L.mapquest.map('map', {
          center: [this.fieldDetails.fieldDetails.latitude, this.fieldDetails.fieldDetails.longitude],
          layers: L.mapquest.tileLayer('map'),
          zoom: 15
        });
        
  
        L.marker([this.fieldDetails.fieldDetails.latitude, this.fieldDetails.fieldDetails.longitude], {
          icon: L.mapquest.icons.marker(),
          draggable: false
        }).bindPopup('Paddy field').addTo(this.map);
        const startPoint = [parseFloat(this.fieldDetails.fieldDetails.latitude), parseFloat(this.fieldDetails.fieldDetails.longitude)];
        const addLatitude = 0.0013;
        const addLongitude = 0.0012;
        const newvalueLatitude = (startPoint[0] + addLatitude).toFixed(4);
        const newvalueLongitude = (startPoint[1] + addLongitude).toFixed(4);
  
  
        const greenFieldCoordinates = [
          startPoint,
          [startPoint[0], newvalueLongitude],
          [newvalueLatitude, newvalueLongitude],
          [newvalueLatitude, startPoint[1]],
  
        ];
        //L.circle([this.application.latitude,this.application.longitude], { radius: 20000 }).addTo(this.map);
        L.polygon(greenFieldCoordinates, {
          fillColor: 'green',
          fillOpacity: 0.5,
          color: 'green',
          weight: 2,
          draggable: false
        }).bindPopup('Green Field').addTo(this.map);
       
      });
    }
}



