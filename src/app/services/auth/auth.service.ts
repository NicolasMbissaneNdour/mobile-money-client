import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { SocketService } from '../socket/socket.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: Boolean;
  isAuthSubject: Subject<Boolean>;
  clientSubject:Subject<Client>;
  client:Client = {balance:0,qrKey:'',token:'',actions:[]};

  constructor(private httpClient: HttpClient,private storageSvc:StorageService) { 
    this.isAuth = false;
    this.isAuthSubject = new Subject<Boolean>();
    this.clientSubject = new Subject<Client>();
  }

  /**
   * login
   */
  public login(phoneNumber: String,password: String) : Promise<any> {
    try {
      return new Promise((resolve,reject)=>{
        var subs : Subscription;
        subs =  this.httpClient.post("https://emoneyserver.herokuapp.com/user/login",{phoneNumber:phoneNumber,password:password})
                .subscribe(async (result: Response)=>{
                  if(result.status == "ok"){
                    this.isAuth = true;
                    this.client.balance = result.data.balance;
                    this.client.qrKey = result.data.qrKey;
                    this.client.token = result.data.token;
                    await this.storageSvc.init();
                    await this.storageSvc.set('balance',result.data.balance);
                    await this.storageSvc.set('qrKey',result.data.qrKey);
                    await this.storageSvc.set('token',result.data.token);
                    const test = await this.storageSvc.get('data');
                    this.emmitClientSubject();
                  }
                  else{
                    if(result.status == "error"){
                      this.isAuth = false;
                    }
                  }
                  subs.unsubscribe();
                  resolve(result)
                },
                (error)=>{
                  if (error.name) {
                    if (error.name == 'HttpErrorResponse') {
                      const response:Response = {
                        status:"error",
                        message:"Erreur réseau verifiez votre connexion!",
                        data:[]
                      }
                      resolve(response);
                    }
                  }
                  const response:Response = {
                    status:"error",
                    message:"Erreur réseau verifiez votre connexion",
                    data:[]
                  }
                  resolve(response);
                })
      })
    } catch (error) {
      console.log("erro")
    }
    
    
  }

  /**
   * logout
   */
  public logout() {
    this.isAuth = false;
  }

  /**
   * register
   */
  public register(phoneNumber: String,password: String): Promise<any> {
    return new Promise((resolve,reject)=>{
      const subs = this.httpClient.post("https://emoneyserver.herokuapp.com/user/register",{phoneNumber:phoneNumber,password:password})
                        .subscribe((result: Response)=>{
                          if (result.status == "ok") {
                            this.isAuth = true;
                          }else{
                            if (result.status == "error") {
                              this.isAuth = false;
                            }
                          }
                          console.log(result)
                          subs.unsubscribe();
                          resolve(result);
                        },
                        (error)=>{
                          if (error.name) {
                            if (error.name == 'HttpErrorResponse') {
                              resolve({
                                status:'error',
                                message:'Erreur réseau verifiez votre connexion!'
                              });
                            }
                          }
                          resolve({
                            status:'error',
                            message:'Erreur réseau verifiez votre connexion'
                          })
                        })
    })
  }

  /**
   * emmitIsAuthSubject
   */
  public emmitIsAuthSubject() {
    this.isAuthSubject.next(this.isAuth)
  }

  /**
   * emmitClientSubject
   */
  public emmitClientSubject() {
    this.clientSubject.next(this.client);
  }

}

export interface Response{
  status: String,
  message: String,
  data: any
}

export interface Client{
  token:String,
  qrKey:String,
  balance:Number,
  actions:any[]
}
