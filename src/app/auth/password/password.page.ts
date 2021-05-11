import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  pin: String;
  lock: boolean;
  
  constructor(private authService:AuthService,private socketService:SocketService,private toastController: ToastController) { 
    this.lock = false;
    this.pin = '';
  }

  async pinChange(){
    console.log(this.pin);
    if (this.pin.length == 8) {
      this.lock = true;
      const result = await this.authService.verifyPassword(this.pin);
      if (result) {
        await this.socketService.connect();
      }
      else{
        this.pin = '';
        this.presentToast('PIN incorrect!')
      }
      this.lock = false;
    }
    
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color:'danger'
    });
    toast.present();
  }

  ngOnInit() {
  }

}
