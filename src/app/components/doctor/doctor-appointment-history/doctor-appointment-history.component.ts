import { Component, OnInit } from '@angular/core';
import { AppointmentTableViewModel } from 'src/app/models/TableViewModels/appointmentTableViewModel.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
@Component({
  selector: 'app-doctor-appointment-history',
  templateUrl: './doctor-appointment-history.component.html',
  styleUrls: ['./doctor-appointment-history.component.css']
})
export class DoctorAppointmentHistoryComponent implements OnInit {
  doctorID:number;
  appointments:AppointmentTableViewModel[];
  constructor(private doctorService:DoctorService,private appointmentService:AppointmentService) { }

  ngOnInit(): void {
    this.getDoctorID();
  }

  getDoctorID(){
    this.doctorService.getID().subscribe(
      res=>{
        this.doctorID=res;
        this.getAppointments();
      },
      err=>{
        console.log(err)
        var e=Error('Failed to get doctor id from JWT')
        throw e;
      }
    );
  }
  
  getAppointments(){
    this.appointmentService.getDoctorAppointmentsTableView(this.doctorID).subscribe(
      res=>{
        if(!res){
          var e=Error('Failed to load appointment history from doctorID...')
          throw e;
        }else{
          this.appointments=res;
        }
      },
      err=>{
        console.log(err);
        var e=Error('Failed to load appointment history from doctorID...')
        throw e;
      }
    );
  }

}
