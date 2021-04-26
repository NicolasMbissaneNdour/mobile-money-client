import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyPasswordPageRoutingModule } from './modify-password-routing.module';

import { ModifyPasswordPage } from './modify-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyPasswordPageRoutingModule
  ],
  declarations: [ModifyPasswordPage]
})
export class ModifyPasswordPageModule {}
