import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contacts-modal',
  templateUrl: './contacts-modal.page.html',
  styleUrls: ['./contacts-modal.page.scss'],
})
export class ContactsModalPage implements OnInit {

  contacts :Contact[]= [
    {
      phoneNumber:'774688435',
      name: 'Nicolas Ndour'
    },
    {
      phoneNumber:'774688435',
      name: 'Jean Diouf'
    },
    {
      phoneNumber:'774688435',
      name: 'Marie Séne'
    },
    {
      phoneNumber:'774688435',
      name: 'Fatou Diop'
    },
    {
      phoneNumber:'774688435',
      name: 'Dialo Boubacar'
    },
    {
      phoneNumber:'774688435',
      name: 'Ba Moussa'
    },
    {
      phoneNumber:'774688435',
      name: 'Alice Mendy'
    },
    {
      phoneNumber:'774688435',
      name: 'Niang Mame Mar'
    },
    {
      phoneNumber:'774688435',
      name: 'Michel Faye'
    },
    {
      phoneNumber:'774688435',
      name: 'Nicolas Ndour'
    },
  ]
  searchText: string;
  name = "nicolas"
  constructor(private modalCtrl:ModalController) { 
    this.searchText = '';
  }

  ngOnInit() {
  }

  onDismiss(){
    this.modalCtrl.dismiss({
      phoneNumber:"",
      name:""
    })
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

export interface Contact {
  name:String,
  phoneNumber:String
}
