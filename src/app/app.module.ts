import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AdminMainComponent } from './components/admin/admin-main/admin-main.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { ContactComponent } from './components/contact/contact.component';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { HttpClientModule } from '@angular/common/http';
import { DoctorMainComponent } from './components/doctor/doctor-main/doctor-main.component';
import { UserMainComponent } from './components/user/user-main/user-main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MobileNavbarItemComponent } from './components/navbar/mobile-navbar-item/mobile-navbar-item.component';
import { MobileNavbarItemDropdownComponent } from './components/navbar/mobile-navbar-item-dropdown/mobile-navbar-item-dropdown.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/sidebar/sidebar-item/sidebar-item.component';
import { SidebarItemDropdownComponent } from './components/sidebar/sidebar-item-dropdown/sidebar-item-dropdown.component';
import { ManageUsersComponent } from './components/admin/manage-users/manage-users.component';
import { ManageDoctorsComponent } from './components/admin/manage-doctors/manage-doctors.component';
import { EditDoctorComponent } from './components/admin/edit-doctor/edit-doctor.component';
import { AppointmentHistoryComponent } from './components/admin/appointment-history/appointment-history.component';
import { ManagePatientsComponent } from './components/admin/manage-patients/manage-patients.component';
import { ViewPatientComponent } from './components/admin/view-patient/view-patient.component';
import { UnreadQueriesComponent } from './components/admin/unread-queries/unread-queries.component';
import { QueryDetailsComponent } from './components/admin/query-details/query-details.component';
import { DoctorSpecializationComponent } from './components/admin/doctor-specialization/doctor-specialization.component';
import { EditDoctorSpecializationComponent } from './components/admin/edit-doctor-specialization/edit-doctor-specialization.component';
import { AddDoctorComponent } from './components/admin/add-doctor/add-doctor.component';
import { ReadQueriesComponent } from './components/admin/read-queries/read-queries.component';
import { DoctorLogsComponent } from './components/admin/doctor-logs/doctor-logs.component';
import { UserLogsComponent } from './components/admin/user-logs/user-logs.component';
import { BetweenDatesReportComponent } from './components/admin/between-dates-report/between-dates-report.component';
import { PatientSearchComponent } from './components/admin/patient-search/patient-search.component';
import { AdminChangePasswordComponent } from './components/admin/admin-change-password/admin-change-password.component';
import { DoctorProfileComponent } from './components/doctor/doctor-profile/doctor-profile.component';
import { DoctorChangePasswordComponent } from './components/doctor/doctor-change-password/doctor-change-password.component';
import { DoctorAppointmentHistoryComponent } from './components/doctor/doctor-appointment-history/doctor-appointment-history.component';
import { AddPatientComponent } from './components/doctor/add-patient/add-patient.component';
import { DoctorManagePatientsComponent } from './components/doctor/doctor-manage-patients/doctor-manage-patients.component';
import { EditPatientComponent } from './components/doctor/edit-patient/edit-patient.component';
import { DoctorViewPatientComponent } from './components/doctor/doctor-view-patient/doctor-view-patient.component';
import { DoctorSearchComponent } from './components/doctor/doctor-search/doctor-search.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserAppointmentsComponent } from './components/user/user-appointments/user-appointments.component';
import { BookAppointmentComponent } from './components/user/book-appointment/book-appointment.component';
import { UserChangePasswordComponent } from './components/user/user-change-password/user-change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminMainComponent,
    AdminLoginComponent,
    HomeContentComponent,
    ContactComponent,
    DoctorLoginComponent,
    UserLoginComponent,
    UserRegisterComponent,
    DoctorMainComponent,
    UserMainComponent,
    DashboardComponent,
    NavbarComponent,
    MobileNavbarItemComponent,
    MobileNavbarItemDropdownComponent,
    SidebarComponent,
    SidebarItemComponent,
    SidebarItemDropdownComponent,
    ManageUsersComponent,
    ManageDoctorsComponent,
    EditDoctorComponent,
    AppointmentHistoryComponent,
    ManagePatientsComponent,
    ViewPatientComponent,
    UnreadQueriesComponent,
    QueryDetailsComponent,
    DoctorSpecializationComponent,
    EditDoctorSpecializationComponent,
    AddDoctorComponent,
    ReadQueriesComponent,
    DoctorLogsComponent,
    UserLogsComponent,
    BetweenDatesReportComponent,
    PatientSearchComponent,
    AdminChangePasswordComponent,
    DoctorProfileComponent,
    DoctorChangePasswordComponent,
    DoctorAppointmentHistoryComponent,
    AddPatientComponent,
    DoctorManagePatientsComponent,
    EditPatientComponent,
    DoctorViewPatientComponent,
    DoctorSearchComponent,
    UserProfileComponent,
    UserAppointmentsComponent,
    BookAppointmentComponent,
    UserChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
