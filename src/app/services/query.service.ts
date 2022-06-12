import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Query } from '../models/query.model';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http:HttpClient) { }

  getNewQueries(){
    return this.http.get<Query[]>(`${environment.baseURL}/query/new-queries.php`);
  }

  getQuery(queryID:number){
    return this.http.get<Query>(`${environment.baseURL}/query/get.php?id=${queryID}`)
  }

  update(query:Query){
    return this.http.put<boolean>(`${environment.baseURL}/query/update.php`,query)
  }

  getReadQueries(){
    return this.http.get<Query[]>(`${environment.baseURL}/query/read-queries.php`);
  }
}
