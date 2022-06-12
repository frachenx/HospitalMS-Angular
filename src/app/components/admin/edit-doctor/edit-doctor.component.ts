import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Specialty } from 'src/app/models/specialty.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit {
  doctor:Doctor=new Doctor();
  docID:number=0;
  specialties:Specialty[];
  resultString:string='';
  doctorForm=new FormGroup({
    id:new FormControl(this.doctor.id,Validators.required),
    specID: new FormControl(this.doctor.specID,Validators.required),
    spec:new FormControl(this.doctor.spec,Validators.required),
    doctorName:new FormControl(this.doctor.doctorName,Validators.required),
    address:new FormControl(this.doctor.address,Validators.required),
    docFee:new FormControl(this.doctor.docFee,Validators.required),
    contact: new FormControl(this.doctor.contact,Validators.required),
    email: new FormControl(this.doctor.email,[Validators.required,Validators.email])
  });
  get specID(){return this.doctorForm.get('specID')}
  get doctorName(){return this.doctorForm.get('doctorName')}
  get address(){return this.doctorForm.get('address')}
  get docFee(){return this.doctorForm.get('docFee')}
  get contact(){return this.doctorForm.get('contact')}
  get email(){return this.doctorForm.get('email')}
  
  constructor(private doctorService:DoctorService,private routeActive:ActivatedRoute,private specialtyService:SpecialtyService) {
   }

  ngOnInit(): void {
    this.routeActive.params.subscribe(
      params=>{
        this.docID=params.id
        this.getDoctor(this.docID);
      }
    );
    this.getSpecialties();
  }
  getDoctor(id:number){
    this.doctorService.getDoctor(id).subscribe(
      res=>{
          if(!res){
            var e=Error('failed to retrieve doctor');
            throw e;
          }else{
            this.doctor=res;
            this.doctorForm=new FormGroup({
              id:new FormControl(this.doctor.id,Validators.required),
              specID: new FormControl(this.doctor.specID,Validators.required),
              spec:new FormControl(this.doctor.spec,Validators.required),
              doctorName:new FormControl(this.doctor.doctorName,Validators.required),
              address:new FormControl(this.doctor.address,Validators.required),
              docFee:new FormControl(this.doctor.docFee,Validators.required),
              contact: new FormControl(this.doctor.contact,Validators.required),
              email: new FormControl(this.doctor.email,[Validators.required,Validators.email])
            });
          }
      },
      err=>{
        console.log(err);
        var e=Error('failed to retrieve doctor');
        throw e;
      }
    );
  }
  getSpecialties(){
    this.specialtyService.getSpecialties().subscribe(
      res=>{
        if(!res){
          var e=Error('failed to load specialties');
          throw e;
        }else{
          this.specialties=res;
        }
      },
      err=>{
        console.log(err);
        var e=Error('failed to load specialties');
          throw e;
      }
    );
  }
  Submit(){
    this.doctorService.update(this.doctorForm.value).subscribe(
      res=>{
        console.log(res);
        if(res){
          this.resultString='1';
          setTimeout(()=>{this.resultString=''},1500);
        }else{
          this.resultString='0';
          setTimeout(()=>{this.resultString=''},1500);
        }
      },
      err=>{
        console.log(err);
        this.resultString='0';
        setTimeout(()=>{this.resultString=''},1500);
        var e=Error('Failed to update doctor');
        throw e;
      }
    );
  }
}
