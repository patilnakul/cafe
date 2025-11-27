import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = environment.apiUrl;
 
  constructor(
    private httpClient: HttpClient
  ) { }

getDetails(){
  return this.httpClient.get(`${environment.apiUrl}/dashboard/details`);
}

}
