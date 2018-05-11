import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from './../pages/login/login';
import * as JWT from 'jwt-decode';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public storage: Storage) 
  {
    this.verificacao()
    this.initializeApp();
  }

  verificacao(){
    
    this.storage.get('token').then((val)=> {
      
      if(val){
        let token = JWT(val);
        if(token['exp'] > (Date.now() / 1000)){
          this.rootPage = HomePage
        }else{
          this.storage.remove('token').then(val => val)
          this.storage.remove('user').then(val => val)
          this.rootPage = LoginPage
        }
      }else{
        this.rootPage = LoginPage
      }
       
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(){
    this.storage.remove('token').then(val => val)
    this.storage.remove('user').then(val => val)
    this.nav.setRoot(LoginPage)
  }
}
