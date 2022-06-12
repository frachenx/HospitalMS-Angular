import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private jwtService:JwtService){

  }
  canActivate():Observable<boolean> {
    var result:Subject<boolean>=new Subject<boolean>();
    this.jwtService.verifyToken(localStorage.getItem('JWT_TOKEN')).subscribe(res=>{
      if( res!=null && res.role!=null && res.role==='admin'){
        result.next(true);
        // return true;
      }else{
        result.next(true);
        // return false;
      }
    },  
    err=>{
      console.log(err);
      result.next(true);
      });
      return result.asObservable();
  }
  
}
