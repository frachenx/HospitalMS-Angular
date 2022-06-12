import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/admin.service';
import { DoctorLogService } from 'src/app/services/doctor-log.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { JwtService } from 'src/app/services/jwt.service';
import { UserLogService } from 'src/app/services/user-log.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() strRole='';
  strUsername:string='';
  id:number;
  constructor(private jwtService:JwtService,private adminService:AdminService,private doctorService:DoctorService,private userService:UserService,private router:Router,private doctorLogService:DoctorLogService,private userLogService:UserLogService) { }

  ngOnInit(): void {
    switch(this.strRole){
      case 'admin':
        var adminID=0;
        this.jwtService.verifyToken(localStorage.getItem('JWT_TOKEN')).subscribe(
          res=>{
            // console.log(res);
            if(res!=null && res.role!=null && res.id!=null && res.role==='admin'){
              adminID=res.id;
              this.adminService.getAdmin(res.id).subscribe(
                res2=>{
                  if(!res2){
                  }else{
                    this.strUsername=res2.username;
                    this.id=res2.id;
                  }
                },
                err2=>{
                  console.log(err2);
                  var e=Error('Failed to get admin object...')
                  throw e;
                }
              )
            }else{
              localStorage.removeItem('JWT_TOKEN');
              this.router.navigate(['/home']);
            }
          },
          err=>{
            localStorage.removeItem('JWT_TOKEN');
            this.router.navigate(['/home']);
            console.log(err);
            var e=Error('Failed to verify JWT')
            throw e;
          }
        );
        
        break;
      case 'doctor':
        var doctorID:number=0;
        this.jwtService.verifyToken(localStorage.getItem('JWT_TOKEN')).subscribe(
          res=>{
            if(res!=null && res.role!=null && res.id!=null && res.role==='doctor'){
              doctorID=res.id;
              this.doctorService.getDoctor(doctorID).subscribe(
                res2=>{
                  this.strUsername=res2.doctorName;
                  this.id=res2.id;
                },
                err2=>{
                  console.log(err2);
                  var e=Error('Failed to load doctor object...')
                  throw e;
                }
              )
            }
          },
          err=>{
            localStorage.removeItem('JWT_TOKEN');
            this.router.navigate(['/home']);
            console.log(err);
            var e=Error('Failed to verify JWT...')
            throw e;
          }
        )
        break;
      case 'user':
        var userID:number=0;
        this.jwtService.verifyToken(localStorage.getItem('JWT_TOKEN')).subscribe(
          res=>{
            if(res!=null && res.role!=null && res.id!=null && res.role==='user'){
              userID=res.id;
              this.userService.getUser(userID).subscribe(
                res2=>{
                  this.strUsername=res2.fullname;
                  this.id=res2.id;
                },
                err2=>{
                  console.log(err2);
                }
              )
            }
          },
          err=>{
            localStorage.removeItem('JWT_TOKEN');
            this.router.navigate(['/home']);
          }
        )
    }
  }
  ngAfterViewInit(){
    this.dropdownToggle();
    this.closeAfterLinkClick();
    this.closeNavbarItemClick();
    this.closeAfterProfileLinkClick();
  }
  ToggleProfileDropdown(){
    let profileContent= document.getElementsByClassName('profile-dropdown-content')[0];
    profileContent.classList.toggle('display-block');
  }
  closeAfterProfileLinkClick(){
    const profileLinks=document.querySelectorAll('.profile-dropdown-content a');
    var k=0;
    for(k=0;k<profileLinks.length;k++){
      const link=profileLinks[k];
      link.addEventListener('click',function(e){
        let profileContent= document.getElementsByClassName('profile-dropdown-content')[0];
        profileContent.classList.toggle('display-block');
      })
    }
    
  }

  dropdownToggle(){
    const dropdownButtons=document.getElementsByClassName('dropdown-toggle');
    let k:number=0;
    for(k=0;k<dropdownButtons.length;k++){
      const dropdownBtn=dropdownButtons[k];
        dropdownBtn.addEventListener('click',(e)=>{
          const dropdownMenu = dropdownBtn.nextElementSibling;
          dropdownMenu?.classList.toggle('display-none');
          // console.log(dropdownBtn);
          // console.log(dropdownMenu);
          // console.log(dropdownMenu?.children)
        })
      }
  }

  toggleMobile(){
    const mobileNavbar=document.getElementsByClassName('mobile-navbar-items')[0];
    mobileNavbar.classList.toggle('display-none');
  }

  closeAfterLinkClick(){
    let links=document.querySelectorAll('.dropdown-menu a');
    const mobileNavbarItems=document.querySelector('.mobile-navbar-items');
    let k:number=0;
    for(k=0;k<links.length;k++){
      const link=links[k];
      link.addEventListener('click',function(){
        const parentMenu=link.parentElement;
        parentMenu?.classList.toggle('display-none');
        mobileNavbarItems?.classList.toggle('display-none');
      })
    }
  }
  closeNavbarItemClick(){
    let links=document.querySelectorAll('a.mobile-navbar-item');
    const mobileNavbarItems=document.querySelector('.mobile-navbar-items');
    let k=0;
    for(k=0;k<links.length;k++){
      const link=links[k];
      link.addEventListener('click',function(){
        mobileNavbarItems?.classList.toggle('display-none');
      })
    }  
  }

  adminLogout(){
    localStorage.removeItem('JWT_TOKEN');
    this.router.navigate(['/home']);
  }

  doctorLogout(){
    this.jwtService.verifyToken(localStorage.getItem('JWT_TOKEN')).subscribe(
      res=>{
        if(res!=null && res.role!=null && res.id!=null && res.logID!=null){
          let mRole=res.role;
          let mID=res.id;
          let mLogID=res.logID;
          this.doctorLogService.logout(mLogID).subscribe(
            res2=>{
              if(res2){
                localStorage.removeItem('JWT_TOKEN');
                this.router.navigate(['/home']);
              }else{
                localStorage.removeItem('JWT_TOKEN');
                this.router.navigate(['/home']);
                var e=Error('Failed to logout');
                throw e;
              }
            },
            err2=>{
              console.log(err2);
              localStorage.removeItem('JWT_TOKEN');
              this.router.navigate(['/home']);
              var e=Error('Failed to logout');
              throw e;
            }
          );
        }else{
          localStorage.removeItem('JWT_TOKEN');
          this.router.navigate(['/home']);
        }
      },
      err=>{
        console.log(err)
        localStorage.removeItem('JWT_TOKEN');
        this.router.navigate(['/home']);
        var e=Error('Failed to verify token')
        throw e;
      }
    );
  }

  userLogout(){
    this.jwtService.verifyToken(localStorage.getItem('JWT_TOKEN')).subscribe(
      res=>{
        if(res!=null && res.role!=null && res.id!=null && res.logID!=null){
          let mRole=res.role;
          let mID=res.id;
          let mLogID=res.logID;
          this.userLogService.logout(mLogID).subscribe(
            res2=>{
              if(res2){
                localStorage.removeItem('JWT_TOKEN');
                this.router.navigate(['/home']);
              }else{
                localStorage.removeItem('JWT_TOKEN');
                this.router.navigate(['/home']);
                var e=Error('Failed to logout');
                throw e;
              }
            },
            err2=>{
              console.log(err2);
              localStorage.removeItem('JWT_TOKEN');
              this.router.navigate(['/home']);
              var e=Error('Failed to logout');
              throw e;
            }
          );
        }else{
          localStorage.removeItem('JWT_TOKEN');
          this.router.navigate(['/home']);
        }
      },
      err=>{
        console.log(err)
        localStorage.removeItem('JWT_TOKEN');
        this.router.navigate(['/home']);
        var e=Error('Failed to verify token')
        throw e;
      }
    );
  }
  
}
