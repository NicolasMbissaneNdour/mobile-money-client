import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading : Boolean;

  constructor() {
    this.loading = false;
   }

  ngOnInit() {
  }

}
