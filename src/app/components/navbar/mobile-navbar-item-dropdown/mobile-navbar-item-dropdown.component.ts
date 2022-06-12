import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-navbar-item-dropdown',
  templateUrl: './mobile-navbar-item-dropdown.component.html',
  styleUrls: ['./mobile-navbar-item-dropdown.component.css']
})
export class MobileNavbarItemDropdownComponent implements OnInit {
  @Input() title:string='';
  @Input() icon:string='';
  @Input() links:Array<any>;
  constructor() { }

  ngOnInit(): void {
  }

}
