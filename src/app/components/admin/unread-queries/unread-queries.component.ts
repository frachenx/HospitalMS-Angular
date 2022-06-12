import { Component, OnInit } from '@angular/core';
import { Query } from 'src/app/models/query.model';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-unread-queries',
  templateUrl: './unread-queries.component.html',
  styleUrls: ['./unread-queries.component.css']
})
export class UnreadQueriesComponent implements OnInit {
  queries:Query[];
  constructor(private queryService:QueryService) { }

  ngOnInit(): void {
    this.getUnreadQueries();
  }

  getUnreadQueries(){
    this.queryService.getNewQueries().subscribe(
      res=>{
        if(!res){
          let e=Error('Failed to load unread queries');
          throw e;
        }else{
          this.queries=res;
        }
      },
      err=>{
        console.log(err)
        let e=Error('Failed to load unread queries');
        throw e;
      }
    );
  }

}
