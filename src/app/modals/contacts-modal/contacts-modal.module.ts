import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsModalPageRoutingModule } from './contacts-modal-routing.module';

import { ContactsModalPage } from './contacts-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactsModalPageRoutingModule
  ],
  declarations: [ContactsModalPage]
})
export class ContactsModalPageModule {}
