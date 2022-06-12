import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { JwtService } from 'src/app/services/jwt.service';
import { PatientService } from 'src/app/services/patient.service';
import { QueryService } from 'src/app/services/query.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role:string='';
  id:number
  totalUsers:number;
  totalDoctors:number;
  totalAppointments:number;
  totalPatients:number;
  totalNewQueries:number;

  constructor(private jwtService:JwtService,private doctorService:DoctorService,private userService:UserService,private appointmentService:AppointmentService,private patientService:PatientService,private queryService:QueryService,private router:Router) { }

  ngOnInit(): void {
    this.jwtService.verifyToken(localStorage.getItem('JWT_TOKEN')).subscribe(res=>{
      if(res!=null && res.role!=null && res.id!=null ){
        this.role=res.role;
        if(this.role==='admin'){
          this.userCount();
          this.appointmentCount();
          this.doctorCount();
          this.patientCount();
          this.newQueriesCount();
        }
      }else{
        localStorage.removeItem('JWT_TOKEN');
        this.router.navigate(['/home']);
      }
    },
    err=>{
      localStorage.removeItem('JWT_TOKEN');
      this.router.navigate(['/home']);
    })
  }
  userCount(){
    this.userService.getUsers().subscribe(
      res=>{
        if(!res)
          this.totalUsers=0;
        else
          this.totalUsers=res.length;
      },
      err=>{
        this.totalUsers=0;
        console.log(err);
        var e=Error('Failed to load user count...')
        throw e;
      }
    );
  }
  appointmentCount(){
    this.appointmentService.getAppointments().subscribe(
      res=>{
        if(!res){
          this.totalAppointments=0;
        }else{
          this.totalAppointments=res.length;
        }
      },
      err=>{
        this.totalAppointments=0;
        console.log(err);
        var e=Error('Failed to load appointment count...')
        throw e;
      }
    );
  }
  doctorCount(){
    this.doctorService.getDoctors().subscribe(
      res=>{
        if(!res)
          this.totalDoctors=0;
        else
          this.totalDoctors=res.length;
      },
      err=>{
        this.totalDoctors=0;
        console.log(err);
        var e=Error('Failed to load doctor count...')
        throw e;
      }
    )
  }
  patientCount(){
    this.patientService.getPatients().subscribe(
      res=>{
        if(!res){
          this.totalPatients=0;
        }else{
          this.totalPatients=res.length;
        }
      },
      err=>{
        this.totalPatients=0;
        var e=Error('Failed to load patient count...')
        throw e;
        console.log(err)
      }
    );
  }
  newQueriesCount(){
    this.queryService.getNewQueries().subscribe(
      res=>{
        if(!res){
          this.totalNewQueries=0;
        }else{
          this.totalNewQueries=res.length;
        }
      },
      err=>{
        this.totalNewQueries=0;
        console.log(err)
        var e=Error('Failed to load new query count...')
        throw e;
      }
    );
  } 
}
