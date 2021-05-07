import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CardModalPage } from '../modals/card-modal/card-modal.page';
import { HistoryModalPage } from '../modals/history-modal/history-modal.page';
import { AuthService, Client } from '../services/auth/auth.service';
import { SocketService } from '../services/socket/socket.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit,OnDestroy{
  clientSubscription: Subscription;
  client:Client;

  constructor(public modalCtrl: ModalController,private autSvc:AuthService,private router:Router,private socketSvc:SocketService) {
    this.client = this.autSvc.client;
  }

  ngOnInit(){
    this.clientSubscription = this.autSvc.clientSubject.subscribe((client)=>{
      this.client = client;
    })
  }

  ngOnDestroy(){
    this.clientSubscription.unsubscribe();
  }

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

  async onShowParams(){
    this.router.navigate(['tabs/tab5'])
  }

}
