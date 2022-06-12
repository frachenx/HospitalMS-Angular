import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Query } from 'src/app/models/query.model';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-query-details',
  templateUrl: './query-details.component.html',
  styleUrls: ['./query-details.component.css']
})
export class QueryDetailsComponent implements OnInit {
  queryID:number;
  query:Query=new Query();
  remarkForm = new FormGroup({
    remark:new FormControl('',Validators.required)
  });
  resultString:string='';
  constructor(private activeRoute:ActivatedRoute,private queryService:QueryService) { }

  ngOnInit(): void {
    this.getQuery();
  }

  getQuery(){
    this.activeRoute.params.subscribe(
      params=>{
        this.queryID=params['id'];
        this.queryService.getQuery(this.queryID).subscribe(
          res2=>{
            if(!res2){
              var e=Error('Failed to get query info...')
              throw e;
            }else{
              this.query=res2;
              console.log(this.query);
            }
          },
          err2=>{
            console.log(err2)
            var e=Error('Failed to get query info...')
            throw e;
          }
        );
      },
      err=>{
        console.log(err);
      }
    );
  }
  Submit(){
    console.log(this.remarkForm.value);
    this.query.adminRemark=this.remarkForm.value.remark;
    console.log(this.query);
    this.queryService.update(this.query).subscribe(
      res=>{
        if(res){
          this.resultString='1';
          setTimeout(()=>{this.resultString=''},1500);
        }else{
          this.resultString='0';
          setTimeout(()=>{this.resultString=''},1500);
          var e=Error('Failed to update query')
          throw e;
        }
        this.getQuery();
      },
      err=>{
        this.resultString='0';
        setTimeout(()=>{this.resultString=''},1500);
        console.log(err)
        var e=Error('Failed to update query')
        throw e;
      }
    );
  }

}
