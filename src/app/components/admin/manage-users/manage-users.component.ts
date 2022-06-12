import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users:User[];
  resultString:string='';
  constructor(private userSerivce:UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers():void{
    this.userSerivce.getUsers().subscribe(
      res=>{
        if(!res){
          var e=Error('failed to load users')
          throw e;
        }else{
          this.users=res;
        }
      },
      err=>{
        console.log(err);
        var e=Error('failed to load users')
          throw e;
      }
    );
  }

  DeleteUser(id:number){
    this.userSerivce.deleteUser(id).subscribe(
      res=>{
        if(res){
          this.resultString='1';
          setTimeout(()=>{this.resultString=''},1500);
        }else{
          this.resultString='0';
          setTimeout(()=>{this.resultString=''},1500);
        }
        this.getUsers();
      },
      err=>{
        this.resultString='0';
        setTimeout(()=>{this.resultString=''},1500);
        console.log(err);
        var e=Error('failed to load users')
        throw e;
      }
    );
  }
}
