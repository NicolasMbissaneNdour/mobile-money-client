import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading : Boolean;
  phoneNumber: String;
  password: String;
  errorMsg: String;

  constructor(private authService: AuthService) {
    this.loading = false;
    this.phoneNumber = '';
    this.password = '';
    this.errorMsg = '';
   }

  ngOnInit() {
  }

  async onLogin(){
    this.loading = true;
    const result = await this.authService.login(this.phoneNumber,this.password)
    if (result.status == "error") {
      this.errorMsg = result.message
    }
    this.loading = false
  }

}
