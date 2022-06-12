import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-manage-doctors',
  templateUrl: './manage-doctors.component.html',
  styleUrls: ['./manage-doctors.component.css']
})
export class ManageDoctorsComponent implements OnInit {
  doctors:Doctor[]
  resultString:string='';
  constructor(private doctorService:DoctorService) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors(){
    this.doctorService.getDoctors().subscribe(
      res=>{
        if(!res){
          var e = Error('Failed to retrieve doctors');
          throw e;
        }else{
          this.doctors=res;
        }
      },
      err=>{
        var e = Error('Failed to retrieve doctors');
        console.log(err)
        throw e;
      }
    );
  }

  deleteDoctor(doctorID:number){
    this.doctorService.delete(doctorID).subscribe(
      res=>{
        if(res){
          this.resultString='1';
          setTimeout(()=>{this.resultString=''},1500);
        }else{
          this.resultString='0';
          setTimeout(()=>{this.resultString=''},1500);
        }
        this.getDoctors();
      },
      err=>{
        this.resultString='0';
          setTimeout(()=>{this.resultString=''},1500);
      }
    );
  }

}
