import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiKeyService } from 'src/app/service/api-key.service';
import { ApplicationService } from 'src/app/service/application.service';
declare let L: any; 



@Component({
  selector: 'app-appdisplayfields',
  templateUrl: './appdisplayfields.component.html',
  styleUrls: ['./appdisplayfields.component.css']
})
export class AppdisplayfieldsComponent {
  map: any;
  application: any;
  marker: any;
  fieldId!: string;
  fieldDetails: any;
  constructor(private route: ActivatedRoute, private appService: ApplicationService,private apiKeyService: ApiKeyService) { }
  ngOnInit(): void {

    const fieldId = this.route.snapshot.params['id'];
    this.appService.getfieldDetails(fieldId).subscribe(app => {
      this.fieldDetails = app;

      const apiKey = this.apiKeyService.getApiKey();
      L.mapquest.key = apiKey;
      
      this.map = L.mapquest.map('map', {
        center: [this.fieldDetails.applicationDetails.latitude, this.fieldDetails.applicationDetails.longitude],
        layers: L.mapquest.tileLayer('map'),
        zoom: 15
      });
  
      L.marker([this.fieldDetails.applicationDetails.latitude, this.fieldDetails.applicationDetails.longitude], {
        icon: L.mapquest.icons.marker(),
        draggable: false
      }).bindPopup('Paddy field').addTo(this.map);
      const startPoint = [parseFloat(this.fieldDetails.applicationDetails.latitude), parseFloat(this.fieldDetails.applicationDetails.longitude)];
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


