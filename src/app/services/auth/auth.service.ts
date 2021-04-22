import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: Boolean;
  isAuthSubject: Subject<Boolean>

  constructor() { 
    this.isAuthSubject = new Subject<Boolean>();
  }

  /**
   * login
   */
  public login() {
    
  }

  /**
   * logout
   */
  public logout() {
    
  }

  /**
   * emmitIsAuthSubject
   */
  public emmitIsAuthSubject() {
    this.isAuthSubject.next(this.isAuth)
  }

}


