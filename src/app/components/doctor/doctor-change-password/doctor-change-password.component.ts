import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';
@Component({
  selector: 'app-doctor-change-password',
  templateUrl: './doctor-change-password.component.html',
  styleUrls: ['./doctor-change-password.component.css']
})
export class DoctorChangePasswordComponent implements OnInit {
  passwordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  })

  get currentPassword() { return this.passwordForm.get('currentPassword') }
  get newPassword() { return this.passwordForm.get('newPassword') }
  get confirmPassword() { return this.passwordForm.get('confirmPassword') }
  doctorID: number;
  boolCheckCurrentPassword: boolean = true;
  boolCheckConfirmPassword: boolean = true;
  resultString: string = '';
  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.getDoctorID();
  }

  getDoctorID() {
    this.doctorService.getID().subscribe(
      res => {
        this.doctorID = res;
      },
      err => {
        console.log(err)
        var e = Error('Failed to load doctor id from jwt')
        throw e;
      }
    );
  }

  checkCurrentPassword() {
    this.doctorService.checkPassword(this.doctorID, this.currentPassword?.value).subscribe(
      res => {
        this.boolCheckCurrentPassword = res;
      },
      err => {
        this.boolCheckCurrentPassword = false;
        console.log(err)
        var e = Error('Failed to check if current password is correct')
        throw e;
      }
    );
  }

  checkConfirmPassword() {
    this.boolCheckConfirmPassword = (this.newPassword?.value === this.confirmPassword?.value);
  }

  handleSubmit() {
    if (this.passwordForm.valid && this.boolCheckConfirmPassword && this.boolCheckCurrentPassword) {
      this.doctorService.changePassword(this.doctorID, this.newPassword?.value).subscribe(
        res => {
          if (res) {
            this.resultString = '1';
            setTimeout(() => { this.resultString = '' }, 1500);
          } else {
            this.resultString = '0';
            setTimeout(() => { this.resultString = '' }, 1500);
            var e = Error('Failed to submit/change new password')
            throw e;
          }
        },
        err => {
          this.resultString = '0';
          setTimeout(() => { this.resultString = '' }, 1500);
          console.log(err);
          var e = Error('Failed to submit/change new password')
          throw e;
        }
      );
    } else {
      this.resultString = '0';
      setTimeout(() => { this.resultString = '' }, 1500);
      var e = Error('Failed to submit/change new password')
      throw e;
    }
  }

}
