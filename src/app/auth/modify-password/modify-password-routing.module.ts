import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyPasswordPage } from './modify-password.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyPasswordPageRoutingModule {}
