import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-manage-patients',
  templateUrl: './manage-patients.component.html',
  styleUrls: ['./manage-patients.component.css']
})
export class ManagePatientsComponent implements OnInit {
  patients:Patient[];
  constructor(private patientService:PatientService) { }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(
      res=>{
        if(!res){
          var e=Error('failed to load patients')
          throw e;
        }else{
          this.patients=res;
        }
      },
      err=>{
        console.log(err);
        var e=Error('failed to load patients')
        throw e;
      }
    );
  }

}
