import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ContactsService, MobileContact } from '../services/contacts.service';
import phoneUtil from 'google-libphonenumber';
const phoneUtilInstance = phoneUtil.PhoneNumberUtil.getInstance();


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  selectedContact : MobileContact;
  contacts : MobileContact[];
  contactsAuthorizationSubs : Subscription;
  nicolas = "nicolas";

  constructor(private contactsService: ContactsService,
              private alertCtrl: AlertController) 
  {
    this.selectedContact = new MobileContact('','');
  }

  ngOnInit(){
    this.contacts = this.contactsService.contacts;
    this.contactsService.getContacts();
    this.contactsAuthorizationSubs = this.contactsService.authorizationSubject.subscribe((value)=>{
      if(!value){
        this.presentAlert("Contacts permission is denied!");
      }
    });

  }
  
  async presentAlert(message:string)
  {
    const alert = await this.alertCtrl.create({
      header:'Alert',
      message:message,
      buttons:['OK']
    });

    alert.present();
  }

  selectedContactChange(event){
    const value = event.target.value;
    if (!value) {
      this.contacts = this.contactsService.contacts;
    }
    else
    {
      this.contacts = this.contactsService.contacts.filter(contact => contact.number.search(value) >= 0);
    }
  }
}
