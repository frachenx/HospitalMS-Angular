import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private jwtService:JwtService){
  }
  canActivate():Observable<boolean>{
    var result=new Subject<boolean>();
    this.jwtService.verifyToken(localStorage.getItem('JWT_TOKEN')).subscribe(res=>{
      if( res!=null && res.role!=null && res.role==='user'){
        // this.result=true;
        result.next(true);
      }else{
        result.next(false);
        // this.result=false;
      }
    },  
    err=>{
      console.log(err); 
      result.next(false);
      // this.result=false;
    });
    // return this.result;
    return result.asObservable();
  }
  
}
