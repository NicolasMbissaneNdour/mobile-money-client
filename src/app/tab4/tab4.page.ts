import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Contact, ContactsService } from '../services/contacts.service';
import { SocketService } from '../services/socket/socket.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit ,OnDestroy{
  
  contact:Contact;
  loading: Boolean;
  amountAccount:number = 10000;
  amount:number;
  onOperate:Boolean;
  onOperateSubscription: Subscription;

  constructor(private contactsSvc:ContactsService,private alerCtrl:AlertController,private socketSvc:SocketService) { 
    this.loading = false;
    this.contact = new Contact('','');
  }

  ngOnInit() {
    this.onOperateSubscription = this.socketSvc.onOperateSubject.subscribe((onOperate)=>{
      this.onOperate = onOperate;
    })
    this.socketSvc.emmitOnOperateSubject();
  }


  ngOnDestroy(){
    this.onOperateSubscription.unsubscribe();
  }

  async onShowContacts(){
    this.loading = true;
    const result = await this.contactsSvc.showContacts();
      if (result) {
        this.contact = new Contact(result.name,result.phoneNumber);
      }
    this.loading = false;
  }

  async onBuy(){
    this.socketSvc.purchase(this.contact.phoneNumber,this.amount,this.contact.name);
  }
  
  async onNumberChange(){
    if (this.contact.phoneNumber.length < 9) {
      this.contact.name = '';
    }
    if (this.contact.phoneNumber.length == 9 && this.contact.isValid() && !this.contact.name) {
      this.loading = true;
      const result = await this.contactsSvc.SearchContact(this.contact.phoneNumber);
      if (result) {
        this.contact.name = result.name;
      }
    }
    this.loading = false;
  }

  onAmountChange(){
    this.amount = this.amount;
  }
  

}
