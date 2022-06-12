import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-doctor-search',
  templateUrl: './doctor-search.component.html',
  styleUrls: ['./doctor-search.component.css']
})
export class DoctorSearchComponent implements OnInit {
  patients:Patient[];
  searchForm=new FormGroup({
    search:new FormControl('',Validators.required)
  })
  get search(){return this.searchForm.get('search')}
  resultString:string='';
  constructor(private patientService:PatientService) { }

  ngOnInit(): void {
  }

  handleSubmit(){
    if(this.searchForm.valid){
      let PatientName=this.searchForm.value.search;
      this.patientService.getByName(PatientName).subscribe(
        res=>{
          if(!res){
            this.resultString='0';
            setTimeout(()=>{this.resultString=''},2000);
          }else{
            this.patients=res;
          }
        },
        err=>{
          console.log(err)
          this.resultString='0';
          setTimeout(()=>{this.resultString=''},2000);
          var e=Error('Failed to query patients by name...')
          throw e;
        }
      );
    }else{
      this.resultString='0';
      setTimeout(()=>{this.resultString=''},2000);
    }
  }

}
