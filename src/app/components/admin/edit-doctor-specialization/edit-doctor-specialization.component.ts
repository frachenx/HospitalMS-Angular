import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Specialty } from 'src/app/models/specialty.model';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-edit-doctor-specialization',
  templateUrl: './edit-doctor-specialization.component.html',
  styleUrls: ['./edit-doctor-specialization.component.css']
})
export class EditDoctorSpecializationComponent implements OnInit {
  specialty:Specialty= new Specialty();
  specID:number;
  specForm =  new FormGroup({
    spec:new FormControl('',Validators.required)
  });
  resultString:string='';
  constructor(private activeRoute:ActivatedRoute,private specialtyService:SpecialtyService) { }

  ngOnInit(): void {
    this.getSpecialty();
  }

  getSpecialty(){
    this.activeRoute.params.subscribe(
      params=>{
        this.specID=params['id'];
        this.specialtyService.getSpecialty(this.specID).subscribe(
          res2=>{
            if(!res2){
              var e=Error('Failed to load specialty...')
              throw e;
            }else{
              this.specialty=res2;
              this.specForm=new FormGroup({
                spec:new FormControl(this.specialty.spec,Validators.required)
              });
            }
          },
          err2=>{
            console.log(err2);
            var e=Error('Failed to load specialty...')
            throw e;
          }
        );
      },  
      err=>{
        console.log(err)
        var e=Error('Failed to load specialty ID...')
        throw e;
      }
    );
  }
  Submit(){
    if(this.specForm.valid){
      this.specialty.spec =this.specForm.value.spec;
      this.specialtyService.update(this.specialty).subscribe(
        res=>{
          if(res){
            this.resultString='1';
            setTimeout(()=>{this.resultString=''},1500);
          }else{
            this.resultString='0';
            setTimeout(()=>{this.resultString=''},1500);
            var e=Error('Failed to update specialty...')
            throw e;
          }
          this.getSpecialty();
        },
        err=>{
          this.resultString='0';
          setTimeout(()=>{this.resultString=''},1500);
          console.log(err)
          var e=Error('Failed to update specialty...')
          throw e;
        }
      );
    }
  }

}
