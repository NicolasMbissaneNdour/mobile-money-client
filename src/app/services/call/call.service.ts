import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private callNummber:CallNumber,private alertCtrl:AlertController) { }

  async call() {
    try {
      await this.callNummber.callNumber("774688435",true);
    } catch (error) {
      console.log(error);
      const alert =  await this.alertCtrl.create({
        'header':'Erreur',
        'message':error,
        'buttons':['OK']
      })
      await alert.present();
    }
    
  }
}
