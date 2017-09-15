import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerForm: any;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public fb: FormBuilder,
    public afAuth: AngularFireAuth ) {
      this.registerForm= this.fb.group({
        email: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])],
        repassword: ['', Validators.compose([Validators.required])]
      });

  }

  _registerSubmit(e) {
    if(this.registerForm.value.password == this.registerForm.value.repassword){
      if(this.registerForm.valid) {
        let email = this.registerForm.value.email;
        let password = this.registerForm.value.password
        this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((success)=>{
          console.log("Login Success: ", success);
        }).catch((error) => {
          console.log("Login Failed: ", error);
        });
      }
    } else {
      //passwords dont match
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
