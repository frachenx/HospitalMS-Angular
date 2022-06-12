import { Component, OnInit } from '@angular/core';
import { AppointmentTableViewModel } from 'src/app/models/TableViewModels/appointmentTableViewModel.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.css']
})
export class AppointmentHistoryComponent implements OnInit {
  appointments:AppointmentTableViewModel[];
  doctorName:string='';
  constructor(private appointmentService:AppointmentService,private doctorService:DoctorService) { }

  ngOnInit(): void {
    this.appointmentService.getAppointmentsTableView().subscribe(
      res=>{
        if(!res){
          var e = Error('failed to load appointments');
          throw e;
        }else{
          this.appointments=res;
        }
      },
      err=>{
        console.log(err)
        var e = Error('failed to load appointments');
        throw e;
      }
    );
  }

}
