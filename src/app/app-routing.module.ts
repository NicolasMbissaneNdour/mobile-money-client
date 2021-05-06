import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'history-modal',
    loadChildren: () => import('./modals/history-modal/history-modal.module').then( m => m.HistoryModalPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'card-modal',
    loadChildren: () => import('./modals/card-modal/card-modal.module').then( m => m.CardModalPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'contacts-modal',
    loadChildren: () => import('./modals/contacts-modal/contacts-modal.module').then( m => m.ContactsModalPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'modify-password',
    loadChildren: () => import('./auth/modify-password/modify-password.module').then( m => m.ModifyPasswordPageModule),
    canActivate:[AuthGuardService]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
