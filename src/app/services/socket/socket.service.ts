import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { interval, Subject, Subscription } from 'rxjs';
import io from 'socket.io-client';
import { AuthService, Client } from '../auth/auth.service';
import { StorageService } from '../storage/storage.service';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  private data: any;
  private intervalSubs: Subscription;
  private onOperate: Boolean;
  public onOperateSubject : Subject<Boolean>;

  constructor(
    private alertController:AlertController,
    private toastController: ToastController,
    private authSvc:AuthService,
    private storageSvc:StorageService,
    private router:Router) {

    this.onOperateSubject = new Subject<Boolean>();
    this.onOperate = false;
    this.emmitOnOperateSubject();
  }

  async disconnect() {
    this.socket.disconnect()
  }

  async connect() {
    try {
      const client = await this.storageSvc.get('client') as Client;
      if (client) {
        this.socket = io('https://emoneyserver.herokuapp.com',{
          auth: {
            token:client.token
          }
        });
        this.prepare();
      }
      else{
        this.router.navigate(['/login'],{replaceUrl:true});
      }      
      
    } catch (error) {
      console.log(error);
    }
    
  }

  async prepare() {
    this.socket.on("connect",async ()=>{
      this.authSvc.isAuth = true;
      this.authSvc.client = await this.storageSvc.get('client') as Client;
      this.router.navigate(['/'],{replaceUrl:true});
      await this.presentToast('Connecté!','success');
      this.intervalSubs = interval(5000).subscribe(()=>{
        this.socket.emit("qrKey");
      })
    })

    this.socket.on("connect_error", async (error) => {
      await this.storageSvc.init();
      await this.storageSvc.clear();
      this.authSvc.isAuth = false;
      this.authSvc.emmitIsAuthSubject();
      this.router.navigate(['/login'],{replaceUrl:true});
    })

    this.socket.on("disconnect", async ()=>{
      await this.presentToast('Deconnexion!','danger');
      if (this.intervalSubs) {
        this.intervalSubs.unsubscribe();
      }
      
    })

    this.socket.on("qrKey", async (data)=>{
      //console.log(data);
      this.authSvc.client.qrKey = data.qrKey;
      this.authSvc.client.balance = data.balance;
      this.authSvc.emmitClientSubject();
    })

    this.socket.on("successOperation", async (data)=>{
      await this.presentAlert(data.subHeader,data.message);
      this.onOperate = false;
      this.emmitOnOperateSubject();
    })
    
    this.socket.on(`${this.authSvc.client.phoneNumber}`, async (data)=>{
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

  async transfer(to:String,amount:Number,name:String='') {
    this.onOperate = true;
    this.emmitOnOperateSubject();
    this.socket.emit("transfer",{
      to:to,
      amount:amount,
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
