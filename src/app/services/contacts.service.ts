import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import phoneUtil from 'google-libphonenumber';
import { AlertController, ModalController } from '@ionic/angular';
import { ContactsModalPage } from '../modals/contacts-modal/contacts-modal.page';
const phoneUtilInstance = phoneUtil.PhoneNumberUtil.getInstance();

const { Contacts } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts : Contact[] = [];

  constructor(private modalCtrl:ModalController,private alertCtrl:AlertController) {}

  async checkPermission(){
    try {
      const permission = await Contacts.getPermissions();
      console.log(permission);
      if (!permission.granted) {
        return {status:"error",message:"Accès non-autorisé aux contacts!"};
      }
      return {status:"ok",data:{permission:true}};
    } catch (error) {
      console.log(error)
      return {status:"error",message:error}
    }
    
  }

  //get all the contacts in the client phone
  async getContacts()
  {
    try {
      //Check if the permission is granted
      const permission = await this.checkPermission();
      if (permission.status == "error") {
        return permission;
      }
      
      const result = await Contacts.getContacts();
      const contacts = result.contacts;
      for(const contact of contacts)
      {
        const phoneNumber = contact.phoneNumbers[0];
        if (phoneNumber && phoneUtilInstance.isValidNumberForRegion(phoneUtilInstance.parse(phoneNumber.number, 'SN'), 'SN'))
        {
          const number = phoneUtilInstance.parseAndKeepRawInput(phoneNumber.number, 'SN')
          const mobileContact = new Contact(contact.displayName,number.getNationalNumber());
          this.contacts.push(mobileContact);
        }
      }
      
      return contacts;
      
    } catch (error) {
      console.log(error)
    }
  }

  async showContacts(){
    //If permission is not granted we present an alert 
    const permission = await this.checkPermission();
    if (permission.status == "error") {
      const alert = await this.alertCtrl.create({
        header:"Erreur",
        message:permission.message,
        buttons:['OK']
      })
      await alert.present();
      return;
    }

    //we search if the contacts list isn't empty for to load it
    if (!this.contacts.length) {
      await this.getContacts();
    }

    //Finally we present the contact list modal
    const modal = await this.modalCtrl.create({
      component:ContactsModalPage,
      swipeToClose:true,
      animated:true
    })

    await modal.present();
    
    const data = await modal.onWillDismiss();

    if (data.data) {
      return data.data;
    }
  }
  
  async SearchContact(phoneNumber:String):Promise<Contact>{
    const permission = await this.checkPermission();
    if (permission.status == "ok" ) {
      if (this.contacts.length == 0) {
        await this.getContacts();
      }
      console.log("search");
      const result = this.contacts.find(contact => contact.phoneNumber == phoneNumber);
      console.log(result);
      return result;
    }
    return;
  }

}



export class Contact{
  public name: String;
  public phoneNumber: String

  constructor(name:string,phoneNumber:string){
    this.phoneNumber  = phoneNumber;
    this.name = name;
  }

  isValid() : Boolean{
    if (this.phoneNumber) {
      return phoneUtilInstance.isValidNumberForRegion(phoneUtilInstance.parse(this.phoneNumber, 'SN'), 'SN');
    }
    return false;
  }
}