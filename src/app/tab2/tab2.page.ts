import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Contact, ContactsService } from '../services/contacts.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  
  contact: Contact;
  amount: number;
  amountRec:number;
  amountAccount:number = 10000;
  canTransfer:Boolean = false;
  loading:Boolean;

  constructor(private alertCtrl: AlertController,private contactsSvc:ContactsService) 
  {
    this.contact = new Contact('','');
    this.canTransfer = this.amount < this.amountAccount;
    this.loading = false;
  }

  ngOnInit(){}
  
 
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
    this.loading = true;
  }
  
}
