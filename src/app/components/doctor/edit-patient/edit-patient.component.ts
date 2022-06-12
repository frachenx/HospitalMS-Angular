import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {
  patient:Patient;
  patientID:number;
  patientForm=new FormGroup({
    id:new FormControl(0,[Validators.required]),
    doctorID:new FormControl(0,[Validators.required]),
    name:new FormControl('',[Validators.required]),
    contact:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    gender:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    age:new FormControl(0,[Validators.required]),
    medicalHistory: new FormControl('',[Validators.required])
  })
  get name(){return this.patientForm.get('name')};
  get contact(){return this.patientForm.get('contact')};
  get email(){return this.patientForm.get('email')};
  get gender(){return this.patientForm.get('gender')};
  get address(){return this.patientForm.get('address')};
  get age(){return this.patientForm.get('age')};
  get medicalHistory(){return this.patientForm.get('medicalHistory')};
  resultString:string='';


  constructor(private activatedRoute:ActivatedRoute,private patientService:PatientService) { }

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient(){
    this.activatedRoute.params.subscribe(
      res=>{
        this.patientID=res['id'];
        this.patientService.getPatient(this.patientID).subscribe(
          res2=>{
            if(!res){
              var e=Error('Failed to retrieve patient from id...')
              throw e;
            }else{
              this.patient=res2;
              this.patientForm=new FormGroup({
                id:new FormControl(this.patient.id,[Validators.required]),
                doctorID:new FormControl(this.patient.doctorID,[Validators.required]),
                name:new FormControl(this.patient.name,[Validators.required]),
                contact:new FormControl(this.patient.contact,[Validators.required]),
                email:new FormControl(this.patient.email,[Validators.required,Validators.email]),
                gender:new FormControl(this.patient.gender,[Validators.required]),
                address:new FormControl(this.patient.address,[Validators.required]),
                age:new FormControl(this.patient.age,[Validators.required]),
                medicalHistory: new FormControl(this.patient.medicalHistory,[Validators.required])
              })
            }
          },
          err2=>{
            console.log(err2)
            var e=Error('Failed to retrieve patient from id...')
            throw e;
          }
        );
      },
      err=>{
        console.log(err);
        var e=Error('Failed to get id from edit-patient route parameters');
        throw e;
      }
    );
  }

  handleSubmit(){
    if(this.patientForm.valid){
      var editPatient=new Patient(this.patientForm.value);
      this.patientService.edit(editPatient).subscribe(
        res=>{
          if(res){
            this.resultString='1';
            setTimeout(()=>{this.resultString=''},1500);
          }else{
            this.resultString='0';
            setTimeout(()=>{this.resultString=''},1500);
            var e=Error('Failed to edit patient info...')
            throw e;
          }
        },
        err=>{
          console.log(err)
          this.resultString='0';
          setTimeout(()=>{this.resultString=''},1500);
          var e=Error('Failed to edit patient info...')
          throw e;
        }
      );
    }else{
      this.resultString='0';
      setTimeout(()=>{this.resultString=''},1500);
    }
  }
}
