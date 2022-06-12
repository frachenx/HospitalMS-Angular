import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { AddPatientComponent } from 'src/app/components/doctor/add-patient/add-patient.component';
import { DoctorAppointmentHistoryComponent } from 'src/app/components/doctor/doctor-appointment-history/doctor-appointment-history.component';
import { DoctorChangePasswordComponent } from 'src/app/components/doctor/doctor-change-password/doctor-change-password.component';
import { DoctorMainComponent } from 'src/app/components/doctor/doctor-main/doctor-main.component';
import { DoctorManagePatientsComponent } from 'src/app/components/doctor/doctor-manage-patients/doctor-manage-patients.component';
import { DoctorProfileComponent } from 'src/app/components/doctor/doctor-profile/doctor-profile.component';
import { DoctorSearchComponent } from 'src/app/components/doctor/doctor-search/doctor-search.component';
import { DoctorViewPatientComponent } from 'src/app/components/doctor/doctor-view-patient/doctor-view-patient.component';
import { EditPatientComponent } from 'src/app/components/doctor/edit-patient/edit-patient.component';

const routes: Routes = [
  {path:'',component:DoctorMainComponent,children:[
    {path:'dashboard',component:DashboardComponent},
    {path:'',redirectTo:'/doctor/dashboard',pathMatch:'full'},
    {path:'edit-profile',component:DoctorProfileComponent},
    {path:'change-password',component:DoctorChangePasswordComponent},
    {path:'appointment-history',component:DoctorAppointmentHistoryComponent},
    {path:'add-patient',component:AddPatientComponent},
    {path:'manage-patients',component:DoctorManagePatientsComponent},
    {path:'edit-patient/:id',component:EditPatientComponent},
    {path:'view-patient/:id',component:DoctorViewPatientComponent},
    {path:'patient-search',component:DoctorSearchComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
