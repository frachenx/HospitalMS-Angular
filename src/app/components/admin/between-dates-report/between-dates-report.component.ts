import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-between-dates-report',
  templateUrl: './between-dates-report.component.html',
  styleUrls: ['./between-dates-report.component.css']
})
export class BetweenDatesReportComponent implements OnInit {
  reportForm=new FormGroup({
    start:new FormControl(Date.now(),Validators.required),
    end:new FormControl(Date.now(),Validators.required)
  })
  get start(){return this.reportForm.get('start')}
  get end(){return this.reportForm.get('end')}

  patients:Patient[];
  
  constructor(private patientService:PatientService) { }

  ngOnInit(): void {
  }

  Submit(){
    if(this.reportForm.valid){
      this.patientService.betweenDatesReport(this.reportForm.value.start,this.reportForm.value.end).subscribe(
        res=>{
          if(!res){
            var e=Error('Failed to load report...')
            throw e;
          }else{
            this.patients=res;
          }
        },
        err=>{
          console.log(err);
          var e=Error('Failed to load report...')
          throw e;
        }
      );
    }
  }

}
