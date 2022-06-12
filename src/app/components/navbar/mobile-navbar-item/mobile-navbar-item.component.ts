import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-navbar-item',
  templateUrl: './mobile-navbar-item.component.html',
  styleUrls: ['./mobile-navbar-item.component.css']
})
export class MobileNavbarItemComponent implements OnInit {
  @Input() title:string='';
  @Input() link:string='';
  @Input() icon:string='';
  constructor() { }

  ngOnInit(): void {
  }

}
