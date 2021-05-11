import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Client } from 'src/app/services/auth/auth.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { StorageService } from 'src/app/services/storage/storage.service';

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

  constructor(private authService: AuthService,private router:Router,private socketSvc:SocketService,private storageSvc:StorageService) {
    this.loading = false;
    this.phoneNumber = '774688435';
    this.password = '12345678';
    this.errorMsg = '';
   }

  async ngOnInit() {
    this.loading = true;
    await this.storageSvc.init();
    const client = await this.storageSvc.get('client') as Client;
    if (client) {
      this.loading = false;
      this.router.navigate(['/password'],{replaceUrl:true})
      //await this.socketSvc.connect();
    }
    this.loading = false
  }

  ngOnDestroy(){
  }

  async onLogin(){
    this.loading = true;
    const result = await this.authService.login(this.phoneNumber,this.password)
    if (result.status == "error") {
      this.errorMsg = result.message
    }
    else{
      await this.socketSvc.connect();
      this.router.navigate(['/'],{replaceUrl:true});
      
    }
    this.loading = false;
  }

}
