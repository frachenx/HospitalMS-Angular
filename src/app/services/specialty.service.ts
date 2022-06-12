import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Specialty } from '../models/specialty.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  constructor(private http:HttpClient) { }

  getSpecialties(){
    return this.http.get<Specialty[]>(`${environment.baseURL}/doctor-specialty/specialties.php`);
  }

  delete(specID:number){
    return this.http.delete<boolean>(`${environment.baseURL}/doctor-specialty/delete.php?id=${specID}`);
  }

  getSpecialty(specID:number){
    return this.http.get<Specialty>(`${environment.baseURL}/doctor-specialty/get-specialty.php?id=${specID}`)
  }

  insert(spec:Specialty){
    return this.http.post<boolean>(`${environment.baseURL}/doctor-specialty/insert.php`,spec)
  }

  update(spec:Specialty){
    return this.http.put<boolean>(`${environment.baseURL}/doctor-specialty/update.php`,spec)
  }
}
