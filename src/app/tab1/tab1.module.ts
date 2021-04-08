import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { QRCodeModule } from 'angularx-qrcode'; 
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { HistoryModalPage } from '../modals/history-modal/history-modal.page';
import { CardModalPage } from '../modals/card-modal/card-modal.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    QRCodeModule,
  ],
  declarations: [Tab1Page,HistoryModalPage,CardModalPage]
})
export class Tab1PageModule {}
