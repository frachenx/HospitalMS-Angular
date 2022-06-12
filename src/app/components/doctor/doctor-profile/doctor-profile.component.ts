import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Specialty } from 'src/app/models/specialty.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  doctor:Doctor=new Doctor();
  specialties:Specialty[];
  resultString:string='';
  doctorForm=new FormGroup({
    id:new FormControl(0,Validators.required),
    specID:new FormControl(0,Validators.required),
    spec:new FormControl('',Validators.required),
    doctorName:new FormControl('',Validators.required),
    address:new FormControl('',Validators.required),
    docFee:new FormControl(0,Validators.required),
    contact:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
  });
  constructor(private activatedRoute:ActivatedRoute,private doctorService:DoctorService,private specialtyService:SpecialtyService){ }

  ngOnInit(): void {
    this.getSpecialties();
    this.getDoctor();
  }
  getSpecialties(){
    this.specialtyService.getSpecialties().subscribe(
      res=>{
        if(!res){
          var e=Error('Failed to retrieve specialties');
          throw e;
        }else{
          this.specialties=res;
        }
      },
      err=>{
        console.log(err);
        var e=Error('Failed to retrieve specialties');
        throw e;
      }
    );
  }
  getDoctor(){
    this.doctorService.getID().subscribe(
      res=>{
        this.doctorService.getDoctor(res).subscribe(
          res2=>{ 
            if(!res2){
              var e=Error('Failed to retrieve doctor from id')
              throw e;
            }else{
              this.doctor=res2;
              this.doctorForm=new FormGroup({
                id:new FormControl(this.doctor.id,Validators.required),
                specID:new FormControl(this.doctor.specID,Validators.required),
                spec:new FormControl(this.doctor.spec,Validators.required),
                doctorName:new FormControl(this.doctor.doctorName,Validators.required),
                address:new FormControl(this.doctor.address,Validators.required),
                docFee:new FormControl(this.doctor.docFee,Validators.required),
                contact:new FormControl(this.doctor.contact,Validators.required),
                email:new FormControl(this.doctor.email,[Validators.required,Validators.email]),
              });
            }
          },
          err2=>{
            console.log(err2);
            var e=Error('Failed to retrieve doctor from id')
            throw e;
          }
        );
      },
      err=>{
        console.log(err)
        var e=Error('Failed to retrieve id from route parameters')
        throw e;
      }
    );
  }

  handleSubmit(){
    if(this.doctorForm.valid){
      this.doctorService.update(this.doctorForm.value).subscribe(
        res=>{
          if(res){
            this.resultString='1';
            setTimeout(()=>{this.resultString=''},1500);
          }else{
            this.resultString='0';
            setTimeout(()=>{this.resultString=''},1500);
            var e=Error('Failed to updated doctor info...')
            throw e;
          }
          this.getDoctor()
        },
        err=>{
          console.log(err)
          this.resultString='0';
          setTimeout(()=>{this.resultString=''},1500);
          var e=Error('Failed to updated doctor info...')
          throw e;
        }
      );
    }else{
      alert('Fill the form correctly please.')
    }
  }
}
