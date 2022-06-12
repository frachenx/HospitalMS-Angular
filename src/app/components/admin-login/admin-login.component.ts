import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/models/admin.model';
import { Router, RoutesRecognized } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  });
  admin:Admin;
  error:string='';
  get username(){return this.loginForm.get('username')}
  get password(){return this.loginForm.get('password')}

  constructor(private adminService:AdminService,private router:Router) { }

  ngOnInit(): void {
  }

  Submit(){
    this.admin= new Admin(this.loginForm.value);
    this.adminService.login(this.admin).subscribe(
      res=>{
      if(!res){
        this.error='1';
      }else{
        this.error='0';
        localStorage.removeItem('JWT_TOKEN');
        localStorage.setItem('JWT_TOKEN',res)
        this.router.navigate(['/admin']);
      }
    },
    err=>{
      this.error='1';
      console.log(err);
      var e=Error('Failed login...')
      throw e;
    }
    )
  }
}
