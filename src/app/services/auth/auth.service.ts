import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: Boolean;
  isAuthSubject: Subject<Boolean>

  constructor(private httpClient: HttpClient) { 

    this.isAuthSubject = new Subject<Boolean>();
  }

  /**
   * login
   */
  public login(phoneNumber: String,password: String) : Promise<any> {
    return new Promise((resolve,reject)=>{
      var subs : Subscription;
      subs =  this.httpClient.post("http://localhost:3000/user/login",{phoneNumber:phoneNumber,password:password})
              .subscribe((result: Response)=>{
                if(result.status == "ok"){
                  this.isAuth = false;
                  console.log(result);
                }
                else{
                  if(result.status == "error"){
                    this.isAuth = false;
                  }
                }
                subs.unsubscribe();
                resolve(result)
              })
    })
    
  }

  /**
   * logout
   */
  public logout() {
    
  }

  /**
   * register
   */
  public register(phoneNumber: String,password: String): Promise<any> {
    return new Promise((resolve,reject)=>{
      const subs = this.httpClient.post("http://localhost:3000/user/register",{phoneNumber:phoneNumber,password:password})
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
                        })
    })
  }

  /**
   * emmitIsAuthSubject
   */
  public emmitIsAuthSubject() {
    this.isAuthSubject.next(this.isAuth)
  }

}

export interface Response{
  status: String,
  message: String,
  data: any
}
