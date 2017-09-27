import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
})
export class GamesPage {
  players: Array<{ date: string }> = [];
  items: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public afDB: AngularFireDatabase) {

      // afAuth.authState.subscribe(user => {
      //   if (!user) {
      //     this.navCtrl.setRoot(HomePage);
      //   } else {
      //     this.items = afDB.list('/' + user.uid + '/games/');
      //     this.items.subscribe(snapshot => {
      //       snapshot.forEach(snap => {
      //         let pushed = {
      //           date: snap.date
      //         }
      //         this.players.push(pushed);
      //       })
      //     })
      //   }
      // });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamesPage');
  }

}
