import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from 'src/app/components/admin/admin-main/admin-main.component';
import { ManageDoctorsComponent } from 'src/app/components/admin/manage-doctors/manage-doctors.component';
import { ManageUsersComponent } from 'src/app/components/admin/manage-users/manage-users.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import {EditDoctorComponent} from 'src/app/components/admin/edit-doctor/edit-doctor.component'
import { AppointmentHistoryComponent } from 'src/app/components/admin/appointment-history/appointment-history.component';
import {ManagePatientsComponent} from 'src/app/components/admin/manage-patients/manage-patients.component'
import { ViewPatientComponent } from 'src/app/components/admin/view-patient/view-patient.component';
import { UnreadQueriesComponent } from 'src/app/components/admin/unread-queries/unread-queries.component';
import { QueryDetailsComponent } from 'src/app/components/admin/query-details/query-details.component';
import { DoctorSpecializationComponent } from 'src/app/components/admin/doctor-specialization/doctor-specialization.component';
import { EditDoctorSpecializationComponent } from 'src/app/components/admin/edit-doctor-specialization/edit-doctor-specialization.component';
import { AddDoctorComponent } from 'src/app/components/admin/add-doctor/add-doctor.component';
import { ReadQueriesComponent } from 'src/app/components/admin/read-queries/read-queries.component';
import { DoctorLogsComponent } from 'src/app/components/admin/doctor-logs/doctor-logs.component';
import { UserLogsComponent } from 'src/app/components/admin/user-logs/user-logs.component';
import { BetweenDatesReportComponent } from 'src/app/components/admin/between-dates-report/between-dates-report.component';
import { PatientSearchComponent } from 'src/app/components/admin/patient-search/patient-search.component';
import { AdminChangePasswordComponent } from 'src/app/components/admin/admin-change-password/admin-change-password.component';
const routes: Routes = [
  {path:'', component:AdminMainComponent,children:[
    {path:'',redirectTo:'/admin/dashboard',pathMatch:'full'},
    {path:'dashboard',component:DashboardComponent},
    {path:'manage-users',component:ManageUsersComponent},
    {path:'manage-doctors',component:ManageDoctorsComponent},
    {path:'edit-doctor/:id',component:EditDoctorComponent},
    {path:'appointment-history',component:AppointmentHistoryComponent},
    {path:'manage-patients',component:ManagePatientsComponent},
    {path:'view-patient/:id',component:ViewPatientComponent},
    {path:'unread-queries',component:UnreadQueriesComponent},
    {path:'query-details/:id',component:QueryDetailsComponent},
    {path:'doctor-specialization',component:DoctorSpecializationComponent},
    {path:'edit-doctor-specialization/:id',component:EditDoctorSpecializationComponent},
    {path:'add-doctor',component:AddDoctorComponent},
    {path:'read-queries',component:ReadQueriesComponent},
    {path:'doctor-logs',component:DoctorLogsComponent},
    {path:'user-logs',component:UserLogsComponent},
    {path:'between-dates-report',component:BetweenDatesReportComponent},
    {path:'patient-search',component:PatientSearchComponent},
    {path:'change-password',component:AdminChangePasswordComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
