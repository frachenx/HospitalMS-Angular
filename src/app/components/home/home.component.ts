import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navbarToggle(){
    const mobileItems=document.getElementsByClassName('mobile-home-navbar-items')[0]
    mobileItems.classList.toggle('display-none')
  }

}
