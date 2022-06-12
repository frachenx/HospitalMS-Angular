import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentTableViewModel } from 'src/app/models/TableViewModels/appointmentTableViewModel.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css']
})
export class UserAppointmentsComponent implements OnInit {
  appointments:AppointmentTableViewModel[]
  userID:number;
  resultString:string='';
  constructor(private appointmentService:AppointmentService,private userService:UserService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(){
    this.userService.getID().subscribe(
      res=>{
        this.userID=res;
        this.appointmentService.getUserAppointmentHistory(this.userID).subscribe(
          res2=>{
            if(!res2){
              var e=Error('Failed to get appointment history from userID...')
              throw e;
            }else{
              this.appointments=res2;
            }
          },
          err2=>{
            console.log(err2)
            var e=Error('Failed to get appointment history from userID...')
            throw e;
          }
        );
      },
      err=>{
        console.log(err)
        var e=Error('Failed to get userID from jwt...')
        throw e;
      }
    );
  }

  handleCancelAppointment(appointmentID:number){
    this.appointmentService.cancelAppointmentByUser(appointmentID).subscribe(
      res=>{
        if(res){
          this.resultString='1';
          setTimeout(()=>{this.resultString=''},1500);
          this.getAppointments();
        }else{
          this.resultString='0';
          setTimeout(()=>{this.resultString=''},1500);
        }
      },
      err=>{
        console.log(err)
        this.resultString='0';
        setTimeout(()=>{this.resultString=''},1500);
        var e=Error('Failed to cancel appointment by user...')
        throw e;
      }
    );
  }
}
