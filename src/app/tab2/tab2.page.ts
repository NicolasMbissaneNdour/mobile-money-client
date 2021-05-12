import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService, Client } from '../services/auth/auth.service';
import { Contact, ContactsService } from '../services/contacts.service';
import { SocketService } from '../services/socket/socket.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit,OnDestroy{

  
  contact: Contact;
  amount: number;
  amountRec:number;
  canTransfer:Boolean = false;
  loading:Boolean;
  onOperate: Boolean;
  onOperateSubscription: Subscription;
  client: Client = {};
  clientSubscription:Subscription;
  loadingAmount:Boolean;

  constructor(private alertCtrl: AlertController,private contactsSvc:ContactsService,private socketSvc:SocketService,private authService:AuthService) 
  {
    this.contact = new Contact('','');
    this.canTransfer = this.amount < this.client.balance;
    this.onOperate = false;
    this.loadingAmount = false;
    
  }

  ngOnInit(){
    this.onOperateSubscription = this.socketSvc.onOperateSubject.subscribe((onOperate)=>{
      this.onOperate = onOperate;
    })
    this.clientSubscription = this.authService.clientSubject.subscribe((client)=>{
      this.client = client;
      this.loadingAmount = false;
    })
    this.authService.emmitClientSubject();
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

  onAmountChange(){
    this.amountRec = this.amount - (this.amount/100)
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

  async onSend(){
    this.socketSvc.transfer(this.contact.phoneNumber,this.amount,this.contact.name)
    this.contact.name = '';
    this.contact.phoneNumber = '';
    this.amount = 0;
  }
  
}
