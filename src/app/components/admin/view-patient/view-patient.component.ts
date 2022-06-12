import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicalHistory } from 'src/app/models/medical-history.model';
import { Patient } from 'src/app/models/patient.model';
import { MedicalHistoryService } from 'src/app/services/medical-history.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {
  patientID:number=0;
  patient:Patient=new Patient();
  medHistory:MedicalHistory[];
  constructor(private activeRoute:ActivatedRoute,private patientService:PatientService,private medicalHistoryService:MedicalHistoryService) {
   }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params=>{
        this.patientID=params['id'];
        console.log(this.patientID);
        this.patientService.getPatient(this.patientID).subscribe(
          res=>{
            if(!res){
              var e=new Error('Failed to load patient info...');
              throw e;
            }else{
              this.patient=res;
              this.medicalHistoryService.getMedicalHistory(this.patient.id).subscribe(
                res2=>{
                  if(!res2){
                    var e=new Error('Failed to load medical history info...');
                    throw e;
                  }else{
                    this.medHistory=res2;
                  }
                },
                err2=>{
                  console.log(err2);
                  var e=new Error('Failed to load medical history info...');
                  throw e;
                }
              );
            }
          },
          err=>{
            var e=new Error('Failed to load patient...');
            console.log(err);
            throw e;
          }
        );
      }
    );
  }

}
