import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.page.html',
  styleUrls: ['./modify-password.page.scss'],
})
export class ModifyPasswordPage implements OnInit {
  correctPassword:string = "nicolas1234";
  password:string = "";
  newPassword:string = "";
  confNewPassword:string = "";
  errorMsg:string = "";
  loading:Boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onPasswordChange(){
    if (this.correctPassword != this.password && this.password.length) {
      this.errorMsg = 'Mot de passe erroné!'
    }
    else{
      if (this.newPassword != this.confNewPassword && this.newPassword.length) {
        this.errorMsg = 'Les deux mots de passe sont différents!'
      }
      else{
        this.errorMsg = "";
      }
      
    }
  }

  onNewPasswordChange(){
    if (this.newPassword != this.confNewPassword && this.confNewPassword.length) {
      this.errorMsg = 'Les deux mots de passe sont différents!'
    }
    else{
      if (this.correctPassword != this.password && this.password.length) {
        this.errorMsg = 'Mot de passe erroné!'
      }
      else{
        this.errorMsg = "";
      }
    }
  }

  onConfNewPasswordChange(){
    if (this.newPassword != this.confNewPassword && this.newPassword.length) {
      this.errorMsg = 'Les deux mots de passe sont différents!'
    }
    else{
      if (this.correctPassword != this.password && this.password.length) {
        this.errorMsg = 'Mot de passe erroné!'
      }
      else{
        this.errorMsg = "";
      }
    }
  }

}
