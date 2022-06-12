import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MedicalHistory } from 'src/app/models/medical-history.model';
import { Patient } from 'src/app/models/patient.model';
import { MedicalHistoryService } from 'src/app/services/medical-history.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-doctor-view-patient',
  templateUrl: './doctor-view-patient.component.html',
  styleUrls: ['./doctor-view-patient.component.css']
})
export class DoctorViewPatientComponent implements OnInit {
  patient:Patient=new Patient();
  patientID:number;
  medicalHistories:MedicalHistory[]
  constructor(private activatedRoute:ActivatedRoute,private patientService:PatientService,private medHistoryService:MedicalHistoryService) { }

  medHistoryForm=new FormGroup({
    patientID:new FormControl(0,[Validators.required]),
    bloodPressure:new FormControl('',[Validators.required]),
    bloodSugar:new FormControl('',[Validators.required]),
    weight:new FormControl(0,[Validators.required]),
    temperature:new FormControl('',[Validators.required]),
    prescription:new FormControl('',[Validators.required]),
  })
  resultString:string='';
  ngOnInit(): void {
    this.getPatient();
    this.getMedicalHistory();
  }

  getPatient(){
    this.activatedRoute.params.subscribe(
      res=>{
        this.patientID=res['id'];
        this.patientService.getPatient(this.patientID).subscribe(
          res2=>{
            if(!res){
              var e=Error('Failed to load patient from id...')
              throw e;
            }else{
              this.patient=res2;
            }
          },
          err2=>{
            console.log(err2)
            var e=Error('Failed to load patient from id...')
            throw e;
          }
        );
      },
      err=>{
        console.log(err);
        var e=Error('Failed to load id from view-patient route parameters...')
        throw e;
      }
    );
  }

  getMedicalHistory(){
    this.activatedRoute.params.subscribe(
      res=>{
        this.patientID=res['id'];
        this.medHistoryService.getMedicalHistory(this.patientID).subscribe(
          res2=>{
            if(!res){
              var e=Error('Failed to load medical history from patient ID...')
              throw e;
            }else{
              this.medicalHistories=res2;
            }
          },
          err2=>{
            console.log(err2)
            var e=Error('Failed to load medical history from patient ID...')
            throw e;
          }
        );
      },
      err=>{
        console.log(err)
        var e=Error('Failed to get id from view-patient route parameters...')
        throw e;
      }
    );
  }

  toggleModal(){
    const mainContent = document.querySelector('.main-content')
    const modalContainer=document.getElementsByClassName('modal-container')[0];
    const myModal = document.getElementById('myModal');
    // mainContent?.classList.toggle('blur');
    modalContainer?.classList.toggle('show-modal-container');
    myModal?.classList.toggle('show-modal');
  }

  handleMedHistorySubmit(){
    if(this.medHistoryForm.valid){
      let newMedHistory=new MedicalHistory(this.medHistoryForm.value);
      newMedHistory.patientID=this.patientID;
      this.medHistoryService.add(newMedHistory).subscribe(
        res=>{
          if(res){
            this.resultString='1';
            setTimeout(()=>{this.resultString=''},1500);
            this.toggleModal();
            this.medHistoryForm.reset();
            this.getMedicalHistory();
          }else{
            this.resultString='0';
            setTimeout(()=>{this.resultString=''},1500);
            var e=Error('Failed to add medical history...')
            throw e;
            }
        },
        err=>{
          console.log(err)
          this.resultString='0';
          setTimeout(()=>{this.resultString=''},1500);
          var e=Error('Failed to add medical history...')
          throw e;
        }
      );
    }else{
      this.resultString='0';
      setTimeout(()=>{this.resultString=''},1500);
    }
  }

}
