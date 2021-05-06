import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit,OnDestroy {
  loading : Boolean;
  phoneNumber: String;
  password: String;
  errorMsg: String;

  constructor(private authService: AuthService,private router:Router) {
    this.loading = false;
    this.phoneNumber = '774688435';
    this.password = '12345678';
    this.errorMsg = '';
   }

  ngOnInit() {
  }
  ngOnDestroy(){
    console.log("destroyed")
  }

  async onLogin(){
    this.loading = true;
    const result = await this.authService.login(this.phoneNumber,this.password)
    if (result.status == "error") {
      this.errorMsg = result.message
    }
    else{
      this.router.navigate(['/'],{replaceUrl:true});
      
    }
    this.loading = false;
  }

}
