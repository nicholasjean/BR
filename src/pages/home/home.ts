import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, ModalController } from 'ionic-angular';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { RegisterPage } from '../register/register'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginForm: any;
  displayName: any;

  constructor(public navCtrl: NavController, 
    public afAuth: AngularFireAuth, 
    public fb: FormBuilder, 
    public modalCtrl: ModalController) {

      this.loginForm= this.fb.group({
        email: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])]
      });

      afAuth.authState.subscribe(user => {
        console.log("User Data: " , user);
        if (!user) {
          this.displayName = null;        
          return;
        }
        this.displayName = user.displayName;      
      });
  }
  _loginSubmit(event, pro) {
    if(this.loginForm.valid) {
      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then((success)=>{
        console.log("Login Success: ", success);
      }).catch((error) => {
        console.log("Login Failed: ", error);
      });
    }
  }

  _register(){
     let modal = this.modalCtrl.create(RegisterPage);
     modal.present();
  }

}
