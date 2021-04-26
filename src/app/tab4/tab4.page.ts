import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Contact, ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  
  contact:Contact;
  loading: Boolean;
  amountAccount:number = 10000;
  amount:number;

  constructor(private contactsSvc:ContactsService,private alerCtrl:AlertController) { 
    this.loading = false;
    this.contact = new Contact('','');
  }

  ngOnInit() {
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
    this.loading = true;
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
