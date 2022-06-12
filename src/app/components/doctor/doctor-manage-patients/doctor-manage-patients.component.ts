import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-doctor-manage-patients',
  templateUrl: './doctor-manage-patients.component.html',
  styleUrls: ['./doctor-manage-patients.component.css']
})
export class DoctorManagePatientsComponent implements OnInit {
  patients:Patient[];
  doctorID:number;
  constructor(private doctorService:DoctorService,private patientService:PatientService) { }

  ngOnInit(): void {
    this.getDoctorID();
  }

  getDoctorID(){
    this.doctorService.getID().subscribe(
      res=>{
        if(!res){
          var e=Error('Failed to get doctor ID from JWT');
          throw e;
        }else{
          this.doctorID=res;
          this.getPatients(this.doctorID);
        }
      },
      err=>{
        console.log(err);
        var e=Error('Failed to get doctor ID from JWT');
        throw e;
      }
    );
  } 

  getPatients(doctorIDPatients:number){
    this.patientService.getByDoctor(doctorIDPatients).subscribe(
      res=>{
        if(!res){
          var e=Error('Failed to get patients by doctorID');
          throw e;
        }else{
          this.patients=res;
        }
      },
      err=>{
        console.log(err);
        var e=Error('Failed to get patients by doctorID');
        throw e;
      }
    );
  } 

}
