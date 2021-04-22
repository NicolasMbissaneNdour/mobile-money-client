import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Subject } from 'rxjs';
import phoneUtil from 'google-libphonenumber';
const phoneUtilInstance = phoneUtil.PhoneNumberUtil.getInstance();

const { Contacts } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts : MobileContact[] = [];
  authorization : Boolean = true;
  authorizationSubject : Subject<Boolean>;


  constructor() { 
    this.authorizationSubject = new Subject<Boolean>();
  }

  //get all the contacts in the client phone
  async getContacts()
  {
    try {
      //Check if the permission is granted
      const permission = await Contacts.getPermissions();
      if (!permission.granted) {
        this.authorization = false;
        this.emmitAuthorizationSubject();
        throw new Error("Permission tu use contact is denied please authorize");
        
      }
      
      
      this.authorization = true;
      this.emmitAuthorizationSubject();
      const result = await Contacts.getContacts();
      const contacts = result.contacts;
      for(const contact of contacts)
      {
        

        const phoneNumber = contact.phoneNumbers[0];
        if (phoneNumber && phoneUtilInstance.isValidNumberForRegion(phoneUtilInstance.parse(phoneNumber.number, 'SN'), 'SN'))
        {
          const number = phoneUtilInstance.parseAndKeepRawInput(phoneNumber.number, 'SN')
          const mobileContact = new MobileContact(contact.displayName,number.getNationalNumber());
          this.contacts.push(mobileContact);
        }
      }
      
      
    } catch (error) {
      console.log(error)
    }
  }

  emmitAuthorizationSubject()
  {
    this.authorizationSubject.next(this.authorization);
  }

}


export class MobileContact {

  constructor(public name:string,public number:string){}

}