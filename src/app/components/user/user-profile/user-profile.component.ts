import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { JwtService } from 'src/app/services/jwt.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user:User=new User();
  userID:number;
  userForm=new FormGroup({
    id:new FormControl(0,[Validators.required]),
    fullname:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required]),
    gender:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
  })
  resultString:string='';
  get fullname(){return this.userForm.get('fullname')}
  get address(){return this.userForm.get('address')}
  get city(){return this.userForm.get('city')}
  get gender(){return this.userForm.get('gender')}
  get email(){return this.userForm.get('email')}
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userService.getID().subscribe(
      res=>{
        this.userID=res;
        this.userService.getUser(this.userID).subscribe(
          res2=>{
            if(!res2){
              var e=Error('Failed to get user from id...')
              throw e;
            }else{
              this.user=res2;
              this.userForm=new FormGroup({
                id:new FormControl(this.user.id,[Validators.required]),
                fullname:new FormControl(this.user.fullname,[Validators.required]),
                address:new FormControl(this.user.address,[Validators.required]),
                city:new FormControl(this.user.city,[Validators.required]),
                gender:new FormControl(this.user.gender,[Validators.required]),
                email:new FormControl(this.user.email,[Validators.required,Validators.email]),
              })
            }
          },
          err2=>{
            console.log(err2);
            var e=Error('Failed to get user from id...')
            throw e;
          }
        );
      },
      err=>{
        console.log(err);
        var e=Error('Failed to get user id from jwt...')
        throw e;
      }
    );
  }

  handleSubmit(){
    if(this.userForm.valid){
      let updateUser=new User(this.userForm.value);
      this.userService.update(updateUser).subscribe(
        res=>{
          if(res){
            this.resultString='1';
            setTimeout(()=>{this.resultString=''},1500);
          }else{
            this.resultString='0';
            setTimeout(()=>{this.resultString=''},1500);
            var e=Error('Failed to update user...')
            throw e;
          }
        },
        err=>{
          console.log(err)
          this.resultString='0';
          setTimeout(()=>{this.resultString=''},1500);
          var e=Error('Failed to update user...')
          throw e;
        }
      );
    }else{
      this.resultString='0';
      setTimeout(()=>{this.resultString=''},1500);
      var e=Error('Failed to update user...')
      throw e;
    }
  }

}
