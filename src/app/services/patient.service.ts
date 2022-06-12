import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http:HttpClient) { }

  getPatients(){
    return this.http.get<Patient[]>(`${environment.baseURL}/patient/patients.php`);
  }

  getPatient(id:number){
    return this.http.get<Patient>(`${environment.baseURL}/patient/get.php?id=${id}`);
  }

  betweenDatesReport(start:Date,end:Date){
    return this.http.get<Patient[]>(`${environment.baseURL}/patient/report.php?start=${start}&end=${end}`)
  }

  getByName(patientName:string){
    return this.http.get<Patient[]>(`${environment.baseURL}/patient/get-by-name.php?name=${patientName}`)
  }
  getByDoctor(doctorID:number){
    return this.http.get<Patient[]>(`${environment.baseURL}/patient/get-by-doctor.php?id=${doctorID}`)
  }

  edit(patient:Patient){
    return this.http.put<boolean>(`${environment.baseURL}/patient/edit.php`,patient)
  }

  add(patient:Patient){
    return this.http.post<boolean>(`${environment.baseURL}/patient/add.php`,patient)
  }
}
