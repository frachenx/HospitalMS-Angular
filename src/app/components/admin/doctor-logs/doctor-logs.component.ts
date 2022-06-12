import { Component, OnInit } from '@angular/core';
import { DoctorLog } from 'src/app/models/doctor-log.model';
import { DoctorLogService } from 'src/app/services/doctor-log.service';

@Component({
  selector: 'app-doctor-logs',
  templateUrl: './doctor-logs.component.html',
  styleUrls: ['./doctor-logs.component.css']
})
export class DoctorLogsComponent implements OnInit {
  logs:DoctorLog[]
  constructor(private doctorLogService:DoctorLogService) { }

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs(){
    this.doctorLogService.logs().subscribe(
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
