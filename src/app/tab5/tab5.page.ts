import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

  onParam(name){
    console.log(name)
  }

}
