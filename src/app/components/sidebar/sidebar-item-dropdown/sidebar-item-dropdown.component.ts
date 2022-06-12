import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-item-dropdown',
  templateUrl: './sidebar-item-dropdown.component.html',
  styleUrls: ['./sidebar-item-dropdown.component.css']
})
export class SidebarItemDropdownComponent implements OnInit {
  @Input() logo:string='';
  @Input() title:string='';
  @Input() links:Array<any>;
  constructor() { }

  ngOnInit(): void {
  }

}
