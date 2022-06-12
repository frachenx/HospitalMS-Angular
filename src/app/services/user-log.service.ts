import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLog } from '../models/user-log.model';

@Injectable({
  providedIn: 'root'
})
export class UserLogService {

  constructor(private http:HttpClient) { }

  logout(logID:number){
    return this.http.get<boolean>(`${environment.baseURL}/user-log/logout.php?id=${logID}`)
  }
  logs(){
    return this.http.get<UserLog[]>(`${environment.baseURL}/user-log/logs.php`)
  }
}
