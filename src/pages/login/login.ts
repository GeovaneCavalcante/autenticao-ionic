import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GenericoProvider } from '../../providers/generico/generico';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup
  email: any
  password: any
  loading: any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public genericoProvider: GenericoProvider,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController) 
  {
    this.menuCtrl.enable(false);
    let emailRegex = /^[a-z0-9!#$%&'+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-][a-z0-9])?(\.[a-z0-9]([a-z0-9-][a-z0-9])?)$/i;

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ionViewDidLoad() {
   
  }

  singIn(){
    
    this.presentLoading("Carregando")

    let data = {
      email: this.email,
      password: this.password
    }

    this.genericoProvider.login(data)
    .then(data =>{
      if(data['token']){
        this.navCtrl.setRoot(HomePage)
      }else if(data['error']){
        this.presentToast(data['error'])
      }
      this.loading.dismiss();
    })

  }

  presentLoading(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

  presentToast(data) {
    console.log(data)

    if(data['non_field_errors']){

      let toast = this.toastCtrl.create({
        message: data['non_field_errors'],
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {});
      toast.present();

    }else{

      if(data['email']){
        let toast = this.toastCtrl.create({
          message: `E-mail: ${data['email']}`,
          duration: 3000,
          position: 'top'
        });
        toast.present();
        toast.onDidDismiss(() => {});
      }
     
      if(data['password']){
        let toast2 = this.toastCtrl.create({
          message: `Senha: ${data['password']}`,
          duration: 3000,
          position: 'top'
        });
        toast2.present();
        toast2.onDidDismiss(() => {});
      }
          
    }
   
  }

}
