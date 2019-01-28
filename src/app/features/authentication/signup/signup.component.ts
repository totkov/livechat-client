import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { SignUpModel } from '../../../models/signup-model';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  public loading = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    const emailField = new FormControl('', [Validators.required, Validators.email]);
    const passwordField = new FormControl('', [Validators.required, Validators.minLength(6)]);
    const firstnameField = new FormControl('', Validators.required);
    const lastnameField = new FormControl('', Validators.required);

    this.signupForm = new FormGroup({
      email: emailField,
      password: passwordField,
      firstname: firstnameField,
      lastname: lastnameField
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  signin() {
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;

    const model = new SignUpModel(this.f.email.value, this.f.password.value, this.f.firstname.value, this.f.lastname.value);

    this.authenticationService.signup(model)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/authentication/login'], {});
        },
        error => {
          console.log(error);
          this.loading = false;
          alert('Error!');
        });
  }

}
