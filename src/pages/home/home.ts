import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public storage: Storage
  ) 
  {
    this.menuCtrl.enable(true); 
    this.storage.get('user').then((data) => console.log(data))
  }

}
