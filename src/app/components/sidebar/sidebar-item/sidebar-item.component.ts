import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.css']
})
export class SidebarItemComponent implements OnInit {
  @Input() link:string='';
  @Input() logo:string='';
  @Input() title:string='';
  
  constructor() { }

  ngOnInit(): void {
  }

}
