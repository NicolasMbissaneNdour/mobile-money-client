import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  loading: Boolean;
  errorMsg: String;
  phoneNumber: String;
  password: String;

  constructor(private authService:AuthService) { 
    this.loading = false;
    this.errorMsg = '';
    this.phoneNumber = '';
    this.password = '';
  }

  ngOnInit() {
  }

  async onRegister(){
    this.loading = true;
    const result = await this.authService.register(this.phoneNumber,this.password);
    if (result.status == "error") {
      this.errorMsg = result.message;
    }
    this.loading = false;
  }

}
