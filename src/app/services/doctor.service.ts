import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../models/doctor.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient,private jwtService:JwtService,private router:Router) { }

  login(doctor:Doctor){
    return this.http.post<any>(`${environment.baseURL}/doctor/login.php`,doctor);
  }

  getDoctor(id:number){
    return this.http.get<Doctor>(`${environment.baseURL}/doctor/get.php?id=${id}`);
  }

  getDoctors(){
    return this.http.get<Doctor[]>(`${environment.baseURL}/doctor/doctors.php`);
  }

  delete(id:number){
    return this.http.delete<boolean>(`${environment.baseURL}/doctor/delete.php?id=${id}`);
  }

  update(doctor:Doctor){
    return this.http.put(`${environment.baseURL}/doctor/update.php`,doctor);
  }

  changePassword(doctorID:number,newPassword:string){
    return this.http.post<boolean>(`${environment.baseURL}/doctor/change-password.php`,{id:doctorID,password:newPassword})
  }
  
  checkPassword(doctorID:number,currentPassword:string){
    return this.http.post<boolean>(`${environment.baseURL}/doctor/check-password.php`,{id:doctorID,currentPassword})
  }

  fromSpecialty(specID:number){
    return this.http.get<Doctor[]>(`${environment.baseURL}/doctor/from-specialty.php?id=${specID}`)
  }

  insert(doctor:Doctor){
    return this.http.post<boolean>(`${environment.baseURL}/doctor/insert.php`,doctor)
  }

  getID(){
    let id=new Subject<number>();
    this.jwtService.verifyToken(localStorage.getItem('JWT_TOKEN')).subscribe(
      res=>{
        if(res!=null && res.role!=null && res.id!=null && res.role==='doctor'){
          id.next(res.id);
        }else{
          localStorage.removeItem('JWT_TOKEN');
          this.router.navigate(['/home'])
        }
      },
      err=>{
        console.log(err)
        localStorage.removeItem('JWT_TOKEN');
        this.router.navigate(['/home'])
        var e=Error('Failed to retrieve id from jwt ')
        throw e;
      }
    );
    return id.asObservable();
  }
  
}
