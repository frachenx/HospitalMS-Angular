import { Component, OnInit } from '@angular/core';
import { Query } from 'src/app/models/query.model';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-read-queries',
  templateUrl: './read-queries.component.html',
  styleUrls: ['./read-queries.component.css']
})
export class ReadQueriesComponent implements OnInit {
  queries:Query[];
  constructor(private queryService:QueryService) { }

  ngOnInit(): void {
    this.getQueries()
  }

  getQueries(){
    this.queryService.getReadQueries().subscribe(
      res=>{
        if(!res){
          var e=Error('Failed to load read queries...')
          throw e;
        }else{
          this.queries=res;
        }
      },
      err=>{
        console.log(err);
        var e=Error('Failed to load read queries...')
        throw e;
      }
    );
  }

}
