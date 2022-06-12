import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  matchPasswordsFlag: boolean = true;
  loginForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });
  get fullname() { return this.loginForm.get('fullname') };
  get address() { return this.loginForm.get('address') };
  get city() { return this.loginForm.get('city') };
  get gender() { return this.loginForm.get('gender') };
  get email() { return this.loginForm.get('email') };
  get password() { return this.loginForm.get('password') };
  get confirmPassword() { return this.loginForm.get('confirmPassword') };
  resultString = '';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  Submit() {
    if (this.loginForm.valid && this.matchPasswordsFlag) {
      delete this.loginForm.value.confirmPassword;
      let newUser = new User(this.loginForm.value);
      this.userService.register(newUser).subscribe(
        res => {
          if (res) { this.resultString = '1' } else { this.resultString = '0' };
        },
        err => {
          this.resultString='0';
          console.log(err)
          var e=Error('Failed to send register information...')
          throw e;
        }
      )
    }
  }

  matchPasswords() {
    this.matchPasswordsFlag = (this.password?.value === this.confirmPassword?.value);
  }


}
