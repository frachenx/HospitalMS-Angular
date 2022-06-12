import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import { Appointment } from '../models/appointment.model';
import { AppointmentTableViewModel } from '../models/TableViewModels/appointmentTableViewModel.model';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient) { }
  getAppointments(){
    return this.http.get<Appointment[]>(`${environment.baseURL}/appointment/appointments.php`);
  }
  getAppointmentsTableView(){
    return this.http.get<AppointmentTableViewModel[]>(`${environment.baseURL}/appointment/appointment-history.php`);
  }
  getDoctorAppointmentsTableView(doctorID:number){
    return this.http.get<AppointmentTableViewModel[]>(`${environment.baseURL}/appointment/doctor.php?id=${doctorID}`);
  }

  getUserAppointmentHistory(userID:number){
    return this.http.get<AppointmentTableViewModel[]>(`${environment.baseURL}/appointment/user.php?id=${userID}`);
  }

  cancelAppointmentByUser(appointmentID:number){
    return this.http.put<boolean>(`${environment.baseURL}/appointment/user-cancel.php`,{id:appointmentID})
  }

  add(appointment:Appointment){
    return this.http.post<boolean>(`${environment.baseURL}/appointment/add.php`,appointment)
  }
}
