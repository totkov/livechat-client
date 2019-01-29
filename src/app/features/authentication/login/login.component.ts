import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LogInModel } from '../../../models/login-model';
import { AuthenticationService } from '../../../services/authentication.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    if (this.authenticationService.hasLoggedUser) {
      this.router.navigate(['/account/welcome'], {});
    }
  }

  login(loginData: LogInModel) {
    this.loading = true;

    this.authenticationService.login(loginData.email, loginData.password)
            .pipe(first())
            .subscribe(
                data => {
                  window.location.reload();
                },
                error => {
                  this.loading = false;
                  this.alertService.create('Login error', 'danger', 'Invalid username or password');
                });
  }

}
