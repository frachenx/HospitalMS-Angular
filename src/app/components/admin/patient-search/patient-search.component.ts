import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.css']
})
export class PatientSearchComponent implements OnInit {
  patients:Patient[]
  searchForm=new FormGroup({
    name:new FormControl('',Validators.required)
  })
  get name(){return this.searchForm.get('name')}
  constructor(private patientService:PatientService) { }

  ngOnInit(): void {
  }

  Submit(){
    if(this.searchForm.valid){
      console.log(this.searchForm.value.name);
      this.patientService.getByName(this.searchForm.value.name).subscribe(
        res=>{
          console.log(res);
          if(!res){
            var e=Error('Failed to load report...')
            throw e;
          }else{
            this.patients=res;
          }
        },
        err=>{
          console.log(err);
          var e=Error('Failed to load report...')
          throw e;
        }
      );
    }
  }
}
