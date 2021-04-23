import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContactsModalPage } from '../modals/contacts-modal/contacts-modal.page';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  
  contact:any;
  loading: Boolean;

  constructor(private modalCtrl: ModalController) { 
    this.loading = false;
    this.contact = {name:"",phoneNumber:""}; 
  }

  ngOnInit() {
  }

  async onShowContacts(){
    const modal = await this.modalCtrl.create({
      component:ContactsModalPage
    })

    await modal.present();
    const data = await  modal.onWillDismiss();
    if(data.data){
      console.log(data.data)
      this.contact = data.data
    }
    
    return data;
  }

  async onAcheter(){
    this.loading = true;
  }

}
