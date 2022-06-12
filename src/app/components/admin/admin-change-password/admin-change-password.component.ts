import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent implements OnInit {
  passwordForm=new FormGroup({
    currentPassword:new FormControl('',Validators.required),
    newPassword:new FormControl('',Validators.required),
    confirmPassword:new FormControl('',Validators.required),
  });
  get currentPassword(){return this.passwordForm.get('currentPassword')}
  get newPassword(){return this.passwordForm.get('newPassword')}
  get confirmPassword(){return this.passwordForm.get('confirmPassword')}
  currentPasswordCorrect:boolean=true;
  passwordsMatch:boolean=true;
  adminID:number;
  resultString:string='';
  constructor(private  adminService:AdminService,private jwtService:JwtService,private router:Router) { }

  ngOnInit(): void {
    this.getAdminID();
  }
  getAdminID(){
    this.jwtService.verifyToken(localStorage.getItem('JWT_TOKEN')).subscribe(
      res=>{
        if(res!=null && res.role!=null &&res.id!=null && res.role==='admin'){
          this.adminID=res.id;
        }else{
          localStorage.removeItem('JWT_TOKEN');
          this.router.navigate(['/home']);
          var e=Error('Failed to get id from jwt...')
          throw e;
        }
      },
      err=>{
        console.log(err)
        localStorage.removeItem('JWT_TOKEN');
        this.router.navigate(['/home']);
        var e=Error('Failed to get id from jwt...')
        throw e;
      }
    );
  }
  checkPassword(){
    this.adminService.checkPassword(this.adminID,this.currentPassword?.value).subscribe(
      res2=>{
        console.log(res2);
        this.currentPasswordCorrect=res2;
      },
      err2=>{
        console.log(err2)
        this.currentPasswordCorrect=false;
        var e=Error('Failed to check if current password is correct');
        throw e;
      }
    );
  }
  passwordsMatchF(){
    this.passwordsMatch=(this.newPassword?.value===this.confirmPassword?.value)
  }

  Submit(){
    if(this.passwordForm.valid && this.currentPasswordCorrect && this.passwordsMatch){
      this.adminService.changePassword(this.adminID,this.newPassword?.value).subscribe(
        res=>{
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
          var e=Error('Failed to change password...')
          throw e;
        }
      );
    }
  }
}
