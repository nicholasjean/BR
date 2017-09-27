import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-roster',
  templateUrl: 'roster.html',
})
export class RosterPage {
  players: Array<{ name: string }> = [];
  items: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    public alertCtrl: AlertController) {

    afAuth.authState.subscribe(user => {
      if (!user) {
        this.navCtrl.setRoot(HomePage);
      } else {
        this.items = afDB.list('/' + user.uid + '/roster/');
        this.items.subscribe(snapshot => {
          snapshot.forEach(snap => {
            let pushed = {
              name: snap.name
            }
            this.players.push(pushed);
          })
        })
      }
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RosterPage');
  }

  _logout() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }
  _addPlayer() {
    this.showPrompt();
  }
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Add Player',
      message: "Enter players name:",
      inputs: [
        {
          name: 'playersName',
          placeholder: "Player's Name"
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.items.push({
              name: data.playersName
            })
          }
        }
      ]
    });
    prompt.present();
  }
}
