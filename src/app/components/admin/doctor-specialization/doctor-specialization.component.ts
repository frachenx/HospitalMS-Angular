import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Specialty } from 'src/app/models/specialty.model';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-doctor-specialization',
  templateUrl: './doctor-specialization.component.html',
  styleUrls: ['./doctor-specialization.component.css']
})
export class DoctorSpecializationComponent implements OnInit {
  specialties:Specialty[];
  resultStringDelete:string='';
  resultStringAdd:string='';
  specForm= new FormGroup({
    spec:new FormControl('',Validators.required)
  });
  constructor(private specialtyService:SpecialtyService) { }

  ngOnInit(): void {
   this.GetSpecialties(); 
  }

  GetSpecialties(){
    this.specialtyService.getSpecialties().subscribe(
      res=>{
        if(!res){
          var e =Error('Failed to load specialties...')
          throw e;
        }else{
          this.specialties=res;
        }
      },
      err=>{
        console.log(err);
        var e =Error('Failed to load specialties...')
        throw e;
      }
    );
  }
  Delete(specID:number){
    this.specialtyService.delete(specID).subscribe(
      res=>{
        if(res){
          this.resultStringDelete='1';
          setTimeout(()=>{this.resultStringDelete=''},1500)
          
        }else{
          this.resultStringDelete='0';
          setTimeout(()=>{this.resultStringDelete=''},1500)
          var e=Error('Failed to delete specialty...')
          throw e;
        }
        this.GetSpecialties();
      },
      err=>{
        this.resultStringDelete='0';
        setTimeout(()=>{this.resultStringDelete=''},1500)
        console.log(err);
        var e=Error('Failed to delete specialty...')
        throw e;
      }
    );
  }
  Add(){
    console.log(this.specForm.value);
    var newSpec = new Specialty(this.specForm.value);
    this.specialtyService.insert(newSpec).subscribe(
      res=>{
        if(res){
          this.resultStringAdd='1';
          setTimeout(()=>{this.resultStringAdd=''},1500);
        }else{
          this.resultStringAdd='0';
          setTimeout(()=>{this.resultStringAdd=''},1500);
          var e=Error('Failed to add specialty...')
          throw e;
        }
        this.GetSpecialties();
      },
      err=>{
        console.log(err)
        this.resultStringAdd='0';
        setTimeout(()=>{this.resultStringAdd=''},1500);
        var e=Error('Failed to add specialty...')
        throw e;
      }
    );
  }
}
