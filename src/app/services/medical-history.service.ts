import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MedicalHistory } from '../models/medical-history.model';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {

  constructor(private http:HttpClient) { }

  getMedicalHistory(patientID:number){
    return this.http.get<MedicalHistory[]>(`${environment.baseURL}/medical-history/get.php?id=${patientID}`);
  }

  add(medHistory:MedicalHistory){
    return this.http.post<boolean>(`${environment.baseURL}/medical-history/add.php`,medHistory)
  }
}
