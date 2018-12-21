import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login-nav-bar',
  templateUrl: './login-nav-bar.component.html',
  styleUrls: ['./login-nav-bar.component.css']
})
export class LoginNavBarComponent implements OnInit {

  hasLoggedUser = false;
  loggedUserEmail = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.checkLoggedUserInfo();

    this.authenticationService.getEmitter().subscribe(() => {
      window.location.reload();
    });
  }

  logout() {
    this.authenticationService.logout();
  }

  private checkLoggedUserInfo() {
    if (this.authenticationService.hasLoggedUser()) {
      this.hasLoggedUser = true;
      this.loggedUserEmail = this.authenticationService.getLoggedUserEmail();
    }
  }

}
