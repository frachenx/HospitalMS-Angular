import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {
  passwordForm=new FormGroup({
    currentPassword:new FormControl('',[Validators.required]),
    newPassword:new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',[Validators.required])
  })
  get currentPassword(){return this.passwordForm.get('currentPassword')}
  get newPassword(){return this.passwordForm.get('newPassword')}
  get confirmPassword(){return this.passwordForm.get('confirmPassword')}
  resultString:string='';
  userID:number;
  boolCurrentPassword:boolean=true;
  boolPasswordsMatch=true;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getUserID();
  }

  getUserID(){
    this.userService.getID().subscribe(
      res=>{
        this.userID=res;
      },
      err=>{
        console.log(err)
        var e=Error('Failed to get id from jwt...')
        throw e;
      }
    );
  }

  checkCurrentPassword(){
    let pwd=this.passwordForm.value.currentPassword;
    this.userService.checkPassword(this.userID,pwd).subscribe(
      res=>{
        this.boolCurrentPassword=res;
      },
      err=>{
        console.log(err)
        var e=Error('Failed to check if current password is correct...')
        throw e;
      }
    );
  }

  checkPasswordsMatch(){
    let newPwd=this.passwordForm.value.newPassword;
    let confirmPwd=this.passwordForm.value.confirmPassword;
    this.boolPasswordsMatch=(newPwd===confirmPwd);
  }

  handleSubmit(){
    let newPwd=this.passwordForm.value.newPassword;
    if(this.passwordForm.valid && this.boolPasswordsMatch && this.boolCurrentPassword){
      this.userService.changePassword(this.userID,newPwd).subscribe(
        res=>{
          if(res){
            this.resultString='1';
            setTimeout(()=>{this.resultString=''},1500);
            this.passwordForm.reset();
          }else{
            this.resultString='0';
            setTimeout(()=>{this.resultString=''},1500)
            var e=Error('Failed to change password...')
            throw e;
          }
        },
        err=>{
          console.log(err);
          this.resultString='0';
          setTimeout(()=>{this.resultString=''},1500)
          var e=Error('Failed to change password...')
          throw e;
        }
      );
    }else{
      this.resultString='0';
      setTimeout(()=>{this.resultString=''},1500)
      var e=Error('Failed to change password...')
      throw e;
    }
    
  }
}
