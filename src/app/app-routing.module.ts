import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ContactComponent } from './components/contact/contact.component';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { HomeComponent } from './components/home/home.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { AdminGuard } from './guards/admin.guard';
import { DoctorGuard } from './guards/doctor.guard';
import { HomeGuard } from './guards/home.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {path:'',pathMatch:'full', redirectTo:'/home'},
  {path:'home',component:HomeComponent,canActivate:[HomeGuard],
    children:[
    {path:'',component:HomeContentComponent},
    {path:'contact',component:ContactComponent},
    {path:'admin',component:AdminLoginComponent},
    {path:'doctor',component:DoctorLoginComponent},
    {path:'user',component:UserLoginComponent},
    {path:'user-register',component:UserRegisterComponent}
  ]},
  {path:'admin',canActivate:[AdminGuard],loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule)},
  {path:'doctor',canActivate:[DoctorGuard],loadChildren:()=>import('./modules/doctor/doctor.module').then(m=>m.DoctorModule)},
  {path:'user',canActivate:[UserGuard],loadChildren:()=>import('./modules/user/user.module').then(m=>m.UserModule)}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
