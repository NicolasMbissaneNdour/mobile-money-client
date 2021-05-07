import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { interval, Subject, Subscription } from 'rxjs';
import io from 'socket.io-client';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  private data: any;
  private intervalSubs: Subscription;
  private onOperate: Boolean;
  public onOperateSubject : Subject<Boolean>;

  constructor(private alertController:AlertController,private toastController: ToastController,private authSvc:AuthService) {
    this.onOperateSubject = new Subject<Boolean>();
    this.onOperate = false;
    this.emmitOnOperateSubject();
    this.socket  = io('https://emoneyserver.herokuapp.com');
    this.socket.on("connect",async ()=>{
      await this.presentToast('Connection établie!','success');
      this.intervalSubs = interval(5000).subscribe(()=>{
        this.socket.emit("qrKey");
      })
    })

    this.socket.on("disconnect", async ()=>{
      await this.presentToast('Connexion perdue!','danger');
      this.intervalSubs.unsubscribe();
    })

    this.socket.on("qrKey", async (data)=>{
      //console.log(data);
      authSvc.client.qrKey = data.qrKey;
      authSvc.emmitClientSubject();
    })

    this.socket.on("successOperation", async (data)=>{
      await this.presentAlert(data.subHeader,data.message);
      this.onOperate = false;
      this.emmitOnOperateSubject();
    })

    this.socket.on("faillOperation", async (data) => {
      await this.presentAlert(data.subHeader,data.message);
      this.onOperate = false;
      this.emmitOnOperateSubject();
    })
  }


  emmitOnOperateSubject() {
    this.onOperateSubject.next(this.onOperate);
  }

  async transfer(to:String,amout:Number,name:String='') {
    this.onOperate = true;
    this.emmitOnOperateSubject();
    this.socket.emit("transfer",{
      to:to,
      amout:amout,
      name:name
    });
  }

  async purchase(phoneNumber:String,amount:Number,name:String) {
    this.onOperate = true;
    this.emmitOnOperateSubject();
    this.socket.emit("purchase",{
      phoneNumber:phoneNumber,
      amount:amount,
      name:name
    });
  }

  async payment(billCode:String,ref:String,amount:Number) {
    this.onOperate = true;
    this.emmitOnOperateSubject();
    this.socket.emit("payment",{
      billCode:billCode,
      ref:ref,
      amount:amount
    });
  }

  async reload(cardCode:String,cardNumber:String,amount:Number) {
    this.onOperate = true;
    this.emmitOnOperateSubject();
    this.socket.emit("reload",{
      cardCode:cardCode,
      cardNumber:cardNumber,
      amount:amount
    });
  }


  async presentToast(message:string,color:string='primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color:color,
    });
    toast.present();
  }

  async presentAlert(subHeader:string,message:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
