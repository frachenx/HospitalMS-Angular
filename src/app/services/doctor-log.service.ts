import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DoctorLog } from '../models/doctor-log.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorLogService {

  constructor(private http:HttpClient) { }

  logout(logID:number){
    return this.http.get<boolean>(`${environment.baseURL}/doctor-log/logout.php?id=${logID}`)
  }

  logs(){
    return this.http.get<DoctorLog[]>(`${environment.baseURL}/doctor-log/logs.php`)
  }
}
