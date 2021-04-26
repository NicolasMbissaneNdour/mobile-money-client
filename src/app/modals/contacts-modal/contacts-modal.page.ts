import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Contact, ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contacts-modal',
  templateUrl: './contacts-modal.page.html',
  styleUrls: ['./contacts-modal.page.scss'],
})
export class ContactsModalPage implements OnInit {

  contacts :Contact[];
  
  searchText: string;
  
  constructor(private modalCtrl:ModalController,private contactSvc:ContactsService) { 
    this.searchText = '';
  }

  async ngOnInit() {
    this.contacts = this.contactSvc.contacts;
  }

  onDismiss(){
    this.modalCtrl.dismiss();
  }

  onSelected(contact){
    this.modalCtrl.dismiss(contact);
  }

  onSearch(){
    console.log(this.searchText)
  }

  showableContact(contact:Contact){
    return contact.name.toLowerCase().includes(this.searchText.toLowerCase())
  }
}


