import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  error:string='';
  loginForm=new FormGroup({
    email:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required),
  });
  get email(){return this.loginForm.get('email')}
  get password(){return this.loginForm.get('password')}

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  Submit(){
    if(this.loginForm.valid){
      this.userService.login(new User(this.loginForm.value)).subscribe(
      res=>{
        if(!res){
          this.error='1';
        }else{
          this.error='0';
          localStorage.removeItem('JWT_TOKEN');
          localStorage.setItem('JWT_TOKEN',res)
          this.router.navigate(['/user']);
        }
      },err=>{
        console.log(err)
        var e=Error('Failed to validate JWT')
        throw e;
      });
    }
  }

}
