import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.page.html',
  styleUrls: ['./card-modal.page.scss'],
})
export class CardModalPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  closeCardModal(){
    this.modalCtrl.dismiss();
  }

}
