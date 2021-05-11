import { Injectable } from '@angular/core';
import { Plugins} from '@capacitor/core';
import { AlertController } from '@ionic/angular';
const { Share } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private alertController: AlertController) { }

  async share(){
    try {
      await Share.share({
        title:'Money App by Nics',
        text:"Utilisons Emoney,une application rapide,simple et sécurisée pour envoyer et recevoir de l'argent ,payer ses factures et acheter du crédit.Téléchargez le sur ",
        url:'https://github.com/NicolasMbissaneNdour',
        dialogTitle:'Partager Emoney'
      });
      
    } catch (error) {
      await this.presentAlert(error);
    }
    
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Erreur',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }


}
