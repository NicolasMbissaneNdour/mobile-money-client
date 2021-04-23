import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsModalPage } from './contacts-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ContactsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsModalPageRoutingModule {}
