import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CardModalPage } from '../modals/card-modal/card-modal.page';
import { HistoryModalPage } from '../modals/history-modal/history-modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public modalCtrl: ModalController) {}

  async showHistoryModal(){
    const modal = await this.modalCtrl.create({
      component: HistoryModalPage,
      swipeToClose:true
    });

    return await modal.present();
  }

  async showCardModal(){
    const modal = await this.modalCtrl.create({
      component: CardModalPage,
      swipeToClose:true
    });
    
    return await modal.present();
  }

}
