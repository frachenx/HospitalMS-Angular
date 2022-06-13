import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { BookAppointmentComponent } from 'src/app/components/user/book-appointment/book-appointment.component';
import { UserAppointmentsComponent } from 'src/app/components/user/user-appointments/user-appointments.component';
import { UserChangePasswordComponent } from 'src/app/components/user/user-change-password/user-change-password.component';
import { UserMainComponent } from 'src/app/components/user/user-main/user-main.component';
import { UserProfileComponent } from 'src/app/components/user/user-profile/user-profile.component';

const routes: Routes = [
  {path:'',component:UserMainComponent,children:[
    {path:'dashboard',component:DashboardComponent},
    {path:'',redirectTo:'/user/dashboard',pathMatch:'full'},
    {path:'edit-profile',component:UserProfileComponent},
    {path:'appointments',component:UserAppointmentsComponent},
    {path:'book-appointment',component:BookAppointmentComponent},
    {path:'change-password',component:UserChangePasswordComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
