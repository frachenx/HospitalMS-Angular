import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  loginForm= new FormGroup({
    name:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required]),
    contact:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required])
  })
  get name(){return this.loginForm.get('name')}
  get email(){return this.loginForm.get('email')}
  get contact(){return this.loginForm.get('contact')}
  get description(){return this.loginForm.get('description')}
  resultString:string='';
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
  }

  Submit(){
    if(this.loginForm.valid){
      this.adminService.sendQuery(this.loginForm.value).subscribe(
        res=>{
          if(res)
            this.resultString='1';
          else
            this.resultString='0';
        },
        err=>{
          console.log(err);
          this.resultString='0'
          var e=Error('Failed to send query');
          throw e;
        }
      )
    }
  }
}
