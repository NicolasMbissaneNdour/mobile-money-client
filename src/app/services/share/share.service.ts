import { Injectable } from '@angular/core';
import { Plugins} from '@capacitor/core';
const { Share } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  async share(){
    try {
      let shareRet = await Share.share({
        title:'Money App by Nics',
        text:"Utilisons Emoney,une application rapide,simple et sécurisée pour envoyer et recevoir de l'argent ,payer ses factures et acheter du crédit.Téléchargez le sur ",
        url:'https://github.com/NicolasMbissaneNdour',
        dialogTitle:'Partager Emoney'
      });
      
    } catch (error) {
      console.log(error);
    }
    
  }
}
