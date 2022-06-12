import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  baseUrl=environment.baseURL;

  constructor(private http:HttpClient) { }

  verifyToken(token:string|null){
    return  this.http.post<any>(`${this.baseUrl}/verify-token.php`,{jwt:token});
  }
}
