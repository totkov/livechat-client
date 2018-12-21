import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  currentUser: string;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).email;
  }

  ngOnInit() {
  }

}
