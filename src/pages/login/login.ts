import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, AlertController, LoadingController, ViewController, ModalController } from 'ionic-angular';
import { User } from '../../app/shared/sdk/models';
import { UserApi } from '../../app/shared/sdk/services';
import { RegisterPage } from '../register/register';
import { UserData } from '../../providers/user-data';
import { HomePage } from '../home/home';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [

    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0' }),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0)' }),
        animate('1000ms ease-in-out')
      ])
    ]),

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({ transform: 'translate3d(0,2000px,0)', offset: 0 }),
          style({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
          style({ transform: 'translate3d(0,0,0)', offset: 1 })
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class LoginPage {

  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  registerState: any = "in";
  login: { username?: string, password?: string } = {};
  submitted = false;
  generationId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userApi: UserApi,
    public userData: UserData,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController
  ) { 
    this.generationId = this.navParams.get("generationId")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter() {
    let email = this.navParams.get('emailFromRegister')
    if (email) this.login.username = email  
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      let loading = this.loadingCtrl.create({
        content: 'Please Wait...'
      });

      loading.present();

      this.userApi.login({ username: this.login.username, password: this.login.password }).subscribe(
        (res: any) => {
          let role = res.user.roleName as any
          let isAdmin = (role == "admin")
          this.userData.login(isAdmin);
          this.userData.user(res.user);
          loading.dismiss();
        },
        err => {
          console.error(err);
          loading.dismiss();
          this.showAlert(err.name, err.message, ["OK"]);
        },
        () => {
          console.log('login completed');
          if (this.generationId) {
            this.dismiss({success: true})
          } else {
            this.navCtrl.setRoot(HomePage);
          }
          
        }
      )
    }
  }

  onSignup() {
    if (this.generationId) {
      this.dismiss({success: false, register: true})
    } else {
      this.navCtrl.push(RegisterPage);
    }
  }

  showAlert(title: string, subTitle: string, buttons: Array<string>) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

  dismiss(data: any) {
    this.viewCtrl.dismiss(data)
  }

}
