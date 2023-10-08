import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {

  constructor() { }
  getApiKey(): string {
    return environment.apiKey;
  }

}
