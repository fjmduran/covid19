import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from 'src/environments/global';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) {}

   public loadCovidData(localidadDataValue:number):Observable<any>{
    const url:string=Global.url;    
    return this.httpClient.get(`${url}${localidadDataValue}`);
    
  }
}
