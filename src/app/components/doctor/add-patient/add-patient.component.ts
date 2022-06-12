import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/models/patient.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  patient:Patient;
  doctorID:number;
  patientForm=new FormGroup({
    doctorID:new FormControl(0,[Validators.required]),
    name:new FormControl('',[Validators.required]),
    contact:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    gender:new FormControl('',[Validators.required]),
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


  constructor(private doctorService:DoctorService,private patientService:PatientService) { }

  ngOnInit(): void {
    this.getDoctorID();
  }

  getDoctorID(){
    this.doctorService.getID().subscribe(
      res=>{
        if(!res){
          var e=Error('Failed to load doctor ID from JWT...')
          throw e;
        }else{
          this.doctorID=res;
          this.patientForm=new FormGroup({
            doctorID:new FormControl(this.doctorID,[Validators.required]),
            name:new FormControl('',[Validators.required]),
            contact:new FormControl('',[Validators.required]),
            email:new FormControl('',[Validators.required,Validators.email]),
            gender:new FormControl('',[Validators.required]),
            age:new FormControl(0,[Validators.required]),
            medicalHistory: new FormControl('',[Validators.required])
          })
        }
      },
      err=>{
        console.log(err)
        var e=Error('Failed to load doctor ID from JWT...')
        throw e;
      }
    );
  }


  handleSubmit(){
    console.log(this.patientForm.valid);
    console.log(this.patientForm.value);
    if(this.patientForm.valid){
      var newPatient=new Patient(this.patientForm.value);
      this.patientService.add(newPatient).subscribe(
        res=>{
          if(res){
            this.resultString='1';
            setTimeout(()=>{this.resultString=''},1500);
            this.patientForm.reset();
          }else{
            this.resultString='0';
            setTimeout(()=>{this.resultString=''},1500);
            var e=Error('Failed to add new patient...')
            throw e;
          }
        },
        err=>{
          console.log(err);
          this.resultString='0';
          setTimeout(()=>{this.resultString=''},1500);
          var e=Error('Failed to add new patient...')
          throw e;
        }
      );
    }
  }

}
