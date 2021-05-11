import { Component, OnDestroy, OnInit } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit,OnDestroy {
  constructor(private device:Device) {}

  ngOnInit() {
    console.log(this.device.uuid);
    console.log(this.device.platform);
    console.log(this.device.manufacturer);
    console.log(this.device.model)
    console.log(this.device.uuid)
  } 

  ngOnDestroy() {

  }
}
