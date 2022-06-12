import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DoctorService } from '../services/doctor.service';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivate {
  constructor(private jwtService:JwtService){}
  canActivate():Observable<boolean>{
    var result=new Subject<boolean>();
    this.jwtService.verifyToken(localStorage.getItem('JWT_TOKEN')).subscribe(res=>{
      if( res!=null && res.role!=null && res.role==='doctor'){
        result.next(true);
      }else{
        result.next(false);
      }
    },  
    err=>{
      console.log(err);
      //  this.result=false;
      result.next(false);
    });
    // return this.result;
    return result.asObservable();
  }
  
}
