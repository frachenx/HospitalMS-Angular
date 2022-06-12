import { Component, OnInit } from '@angular/core';
import { UserLog } from 'src/app/models/user-log.model';
import { UserLogService } from 'src/app/services/user-log.service';

@Component({
  selector: 'app-user-logs',
  templateUrl: './user-logs.component.html',
  styleUrls: ['./user-logs.component.css']
})
export class UserLogsComponent implements OnInit {

  constructor(private userLogService:UserLogService) { }
  logs:UserLog[];
  ngOnInit(): void {
    this.getLogs();
  }
  getLogs(){
    this.userLogService.logs().subscribe(
      res=>{
        if(!res){
          var e=Error('Failed to load doctor logs...')
          throw e;
        }else{
          this.logs=res;
        }
      },
      err=>{
        console.log(err);
        var e=Error('Failed to load doctor logs...')
        throw e;
      }
    );
  }
}
