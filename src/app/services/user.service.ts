import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private jwtService:JwtService,private router:Router) { }

  login(user:User){
    return this.http.post<any>(`${environment.baseURL}/user/login.php`,user)
  }

  register(user:User){
    return this.http.post<any>(`${environment.baseURL}/user/register.php`,user);
  }

  getUser(id:number){
    return this.http.get<User>(`${environment.baseURL}/user/get.php?id=${id}`);
  }

  getUsers(){
    return this.http.get<User[]>(`${environment.baseURL}/user/users.php`);
  }

  deleteUser(id:number){
    return this.http.delete(`${environment.baseURL}/user/delete.php?id=${id}`);
  }

  getID(){
    let id=new Subject<number>();
    this.jwtService.verifyToken(localStorage.getItem('JWT_TOKEN')).subscribe(
      res=>{
        if(res!=null && res.role!=null && res.id!=null && res.role==='user'){
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

  changePassword(userID:number,newPassword:string){
    return this.http.post<boolean>(`${environment.baseURL}/user/change-password.php`,{userID,newPassword})
  }
  
  checkPassword(userID:number,currentPassword:string){
    return this.http.post<boolean>(`${environment.baseURL}/user/check-password.php`,{userID,currentPassword})
  }

  update(user:User){
    return this.http.put<boolean>(`${environment.baseURL}/user/update.php`,user)
  }

}
