import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Admin } from '../models/admin.model';
import {environment} from 'src/environments/environment'
import { JwtService } from './jwt.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl=environment.baseURL;
  constructor(private  http: HttpClient,private jwtService:JwtService,private router:Router) { }

  login(admin:Admin){
    return this.http.post<any>(`${this.baseUrl}/admin/login.php`,admin);
  }

  sendQuery(query:any){
    return this.http.post<any>(`${this.baseUrl}/contact.php`,query);
  }

  getAdmin(id:number){
    return this.http.get<Admin>(`${this.baseUrl}/admin/get-admin.php?id=${id}`);
  }

  checkPassword(id:number,currentPassword:string){
    return this.http.put<boolean>(`${this.baseUrl}/admin/check-password.php`,{id:id,currentPassword:currentPassword});
  }

  changePassword(id:number,password:string){
    return this.http.put<boolean>(`${this.baseUrl}/admin/change-password.php`,{id:id,password:password})
  }

  getID(){
    let id=new Subject<number>();
    this.jwtService.verifyToken(localStorage.getItem('JWT_TOKEN')).subscribe(
      res=>{
        if(res!=null && res.role!=null && res.id!=null && res.role==='admin'){
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
