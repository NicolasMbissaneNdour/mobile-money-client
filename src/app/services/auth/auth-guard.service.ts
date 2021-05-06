import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(private authSvc:AuthService,private router:Router) { }

  async canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Promise<boolean>{
    if (!this.authSvc.isAuth) {
      this.router.navigate(['/login']);
    }
    else{
      return true;
    }
  }
}
