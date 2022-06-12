import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Appointment } from 'src/app/models/appointment.model';
import { Doctor } from 'src/app/models/doctor.model';
import { Specialty } from 'src/app/models/specialty.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  appointment:Appointment=new Appointment();
  appointmentForm=new FormGroup({
    doctorID:new FormControl(0,[Validators.required]),
    userID:new FormControl(0,[Validators.required]),
    specID:new FormControl(0,[Validators.required]),
    spec:new FormControl('',[]),
    fee:new FormControl(0,[Validators.required]),
    appointmentDate:new FormControl(0,[Validators.required]),
    appointmentTime:new FormControl(0,[Validators.required])
  })
  specialties:Specialty[];
  doctors:Doctor[]
  get doctorID(){return this.appointmentForm.get('doctorID')}
  get userID(){return this.appointmentForm.get('userID')}
  get specID(){return this.appointmentForm.get('specID')}
  get spec(){return this.appointmentForm.get('spec')}
  get fee(){return this.appointmentForm.get('fee')}
  get appointmentDate(){return this.appointmentForm.get('appointmentDate')}
  get appointmentTime(){return this.appointmentForm.get('appointmentTime')}
  strSpec:string='';
  resultString:string='';
  constructor(private specialtyService:SpecialtyService,private doctorService:DoctorService,private userService:UserService,private appointmentService:AppointmentService) { }

  ngOnInit(): void {
    this.getUserID();
    this.getSpecialties();
  }
  
  getUserID(){
    this.userService.getID().subscribe(
      res=>{
        this.appointmentForm.value.userID=res;
        this.appointment.userID=res;
      },
      err=>{
        console.log(err)
        var e=Error('Failed to get userID from jwt...')
        throw e;
      }
    );
  }

  getSpecialties(){
    this.specialtyService.getSpecialties().subscribe(
      res=>{
        if(!res){
          var e=Error('Failed to get specialties...')
          throw e;
        }else{
          this.specialties=res;
        }
      },
      err=>{
        console.log(err)
        var e=Error('Failed to get specialties...')
        throw e;
      }
    );
  }

  getDoctors(){
    let specID=this.appointmentForm.value.specID;
    this.doctorService.fromSpecialty(specID).subscribe(
      res=>{
        if(!res){
          var e=Error('Failed to get doctors from specialty...');
          throw e;
        }else{
          this.doctors=res;
        }
      },
      err=>{
        console.log(err)
        var e=Error('Failed to get doctors from specialty...');
        throw e;
      }
    );
  }

  getConsultancyFee(){
    let doctorID=this.appointmentForm.value.doctorID;
    this.doctorService.getDoctor(doctorID).subscribe(
      res=>{
        if(!res){
          var e=Error('Failed to load consultancy fee from doctorID...')
          throw e;
        }else{
          let doctorInstance:Doctor = res;
          this.appointmentForm.value.fee=doctorInstance.docFee;
          const elementFee:HTMLInputElement=document.getElementById('fee') as HTMLInputElement
          if(elementFee!=undefined){
            elementFee.value=this.appointmentForm.value.fee;
            this.appointment.fee=this.appointmentForm.value.fee;
          }else{
          }
        }
      },
      err=>{
        console.log(err);
        var e=Error('Failed to load consultancy fee from doctorID...')
        throw e;
      }
    );
  }

  handleSubmit(){
    if(this.appointmentForm.valid){
      this.specialtyService.getSpecialty(this.appointmentForm.value.specID).subscribe(
        res=>{
          if(!res){
            var e=Error('Failed to get specialty name from specialtyID...')
            throw e;
          }else{
            this.appointmentForm.value.spec=res.spec;
            this.appointmentForm.value.userID=this.appointment.userID;
            this.appointmentForm.value.fee=this.appointment.fee;
            let newAppointment =new Appointment(this.appointmentForm.value);
            this.appointmentService.add(newAppointment).subscribe(
              res2=>{
                if(res2){
                  this.resultString='1'
                  setTimeout(()=>{this.resultString=''},1500);
                  this.appointmentForm.reset();
                }else{
                  this.resultString='0'
                  setTimeout(()=>{this.resultString=''},1500);
                  var e=Error('Failed to book new appointment...')
                  throw e;
                }
              },
              err2=>{
                console.log(err2)
                this.resultString='0'
                setTimeout(()=>{this.resultString=''},1500);
                var e=Error('Failed to book new appointment...')
                throw e;
              }
            );
          }
        },
        err=>{
          console.log(err)
          this.resultString='0'
          setTimeout(()=>{this.resultString=''},1500);
          var e=Error('Failed to get specialty name from specialtyID...')
          throw e;
        }
      );
    }else{
      this.resultString='0'
      setTimeout(()=>{this.resultString=''},1500);
      var e=Error('Failed to book new appointment...')
      throw e;
    }
  }


}
