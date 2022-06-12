import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent implements OnInit {
  doctor:Doctor;
  loginForm= new FormGroup({
    email:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  });
  get email(){return this.loginForm.get('email')};
  get password(){return this.loginForm.get('password')};
  error:string='';
  constructor(private doctorService:DoctorService,private route:Router) { }

  ngOnInit(): void {
  }

  Submit(){
    this.doctor= new Doctor(this.loginForm.value);
    this.doctorService.login(this.doctor).subscribe(res=>{
      if(!res){
        this.error='1';
      }else{
        this.error='0';
        localStorage.removeItem('JWT_TOKEN');
        localStorage.setItem('JWT_TOKEN',res);
        this.route.navigate(['/doctor']);
      }
    },err=>{
      this.error='1';
      console.log(err);
      var e=Error('Failed login...')
    })
  }

}
