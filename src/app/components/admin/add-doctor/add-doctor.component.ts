import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Specialty } from 'src/app/models/specialty.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  doctor: Doctor = new Doctor();
  doctorForm = new FormGroup({
    specID: new FormControl(0, Validators.required),
    doctorName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    docFee: new FormControl(0, Validators.required),
    contact: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });
  get specID() { return this.doctorForm.get('specID') };
  get doctorName() { return this.doctorForm.get('doctorName') };
  get address() { return this.doctorForm.get('address') };
  get docFee() { return this.doctorForm.get('docFee') };
  get contact() { return this.doctorForm.get('contact') };
  get email() { return this.doctorForm.get('email') };
  get password() { return this.doctorForm.get('password') };
  get confirmPassword() { return this.doctorForm.get('confirmPassword') };
  specialties: Specialty[];
  passwordWarning: string = '';
  resultString: string = '';
  constructor(private specialtyService: SpecialtyService, private doctorService: DoctorService,private router:Router) { }

  ngOnInit(): void {
    this.getSpecialties();
  }

  getSpecialties() {
    this.specialtyService.getSpecialties().subscribe(
      res => {
        if (!res) {
          var e = Error('Failed to load specialties...')
          throw e;
        } else {
          this.specialties = res;
        }
      },
      err => {
        console.log(err)
        var e = Error('Failed to load specialties...')
        throw e;
      }
    );
  }
  Submit() {
    if (this.doctorForm.valid) {
      delete this.doctorForm.value.confirmPassword;
      this.doctor = new Doctor(this.doctorForm.value);
      this.specialtyService.getSpecialty(this.doctor.specID).subscribe(
        res => {
          if (!res) {
            var e = Error('failed to get specialty from id...')
            throw e;
          } else {
            this.doctor.spec = res.spec;
            console.log(this.doctor);
            this.doctorService.insert(this.doctor).subscribe(
              res2 => {
                console.log(res2);
                if (res2) {
                  this.resultString = '1';
                  setTimeout(() => { this.resultString = '' }, 1500);
                  this.router.navigate(['/admin/manage-doctors'])
                } else {
                  this.resultString = '0';
                  setTimeout(() => { this.resultString = '' }, 1500);
                  var e = Error('Failed to add new doctor...')
                  throw e;
                }
              },
              err2 => {
                this.resultString = '0';
                setTimeout(() => { this.resultString = '' }, 1500);
                console.log(err2);
                var e = Error('Failed to add new doctor...')
                throw e;
              }
            );
          }
        },
        err => {
          console.log(err)
          var e = Error('failed to get specialty from id...')
          throw e;
        }
      );

    }
  }

  checkPasswords() {
    if (this.doctorForm.value.password === this.doctorForm.value.confirmPassword) {
      this.passwordWarning = '';
    } else {
      this.passwordWarning = '1';
    }
  }


}
