import { AuthenticationService } from './../services/authentication.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any;
  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private athenticationService: AuthenticationService) {
    this.form = fb.group(
      {
        username: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required)
      }
    )
  }

  ngOnInit(): void {
  }

  getUsername() {
    return this.form.get('username');
  }

  getPassword() {
    return this.form.get('password');
  }

  login(form: any) {
    console.log(form);
    this.athenticationService.logIn(form)
      .subscribe(responce => {
        if (responce) {
          localStorage.setItem('fullName', responce.fullName);
          localStorage.setItem('token', responce.accessToken);
          localStorage.setItem('refreshtoken', responce.refreshToken);
          localStorage.setItem('userType', responce.role);
          console.log(responce);
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/Home']);
          //temp
        }
      })
  }
}
