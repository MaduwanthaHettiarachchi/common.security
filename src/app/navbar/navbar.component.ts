import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {

  }
  logOut() {
    this.authenticationService.logOut()
      .subscribe(res => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshtoken');
        localStorage.removeItem('fullName');
      });
  }
}
