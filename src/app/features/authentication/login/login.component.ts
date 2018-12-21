import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LogInModel } from '../../../models/login-model';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
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
                  console.log(error);
                  this.loading = false;
                  alert('Error!');
                });
  }

}
