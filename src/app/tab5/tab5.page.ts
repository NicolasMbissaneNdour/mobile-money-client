import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CallService } from '../services/call/call.service';
import { ShareService } from '../services/share/share.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  params = [
    {
      label:"Inviter un ami à rejoindre",
      icon:"share-social-outline",
      name:"invite"
    },
    {
      label:"Appelez le service client",
      icon:"call-outline",
      name:"callService"
    },
    {
      label:"Trouver les agents à proximité",
      icon:"location-outline",
      name:"findAgent"
    },
    {
      label:"Vérifier votre plafond",
      icon:"reader-outline",
      name:"verifyLimit"
    },
    {
      label:"Modifiez votre code PIN",
      icon:"key-outline",
      name:"modifyPIN"
    },
    {
      label:"Utiliser un code promotionnel",
      icon:"sparkles-outline",
      name:"getPromo"
    },
    {
      label:"Se déconnecter(774688435)",
      icon:"log-out-outline",
      name:"logout"
    },
  ]
  constructor(private shareSvc:ShareService,
              private router:Router,
              private authSvc:AuthService,
              private callSvc:CallService) { }

  ngOnInit() {
  }

  async onParam(name){
    console.log(name)
    if (name == "invite") {
      this.shareSvc.share()
    }
    if(name == "modifyPIN"){
      this.router.navigate(['/modify-password']);
    }
    if (name == "logout") {
      this.authSvc.logout();
      this.router.navigate(['/login']);
    }
    if (name == "callService") {
      await this.callSvc.call();
    }
  }

}
