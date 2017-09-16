import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, Platform, ToastController } from 'ionic-angular';
import { SchoolsPage } from '../schools/schools';
import { PhotographyPage } from '../photography/photography';
import { EventOrganizerPage } from '../event-organizer/event-organizer';
import { User } from '../../app/shared/sdk/models';
import { UserApi } from '../../app/shared/sdk/services';
import { UserData } from '../../providers/user-data';
import { MyProfilePage } from '../my-profile/my-profile'

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private lastTimeBackPress = 0;
  private timePeriodToExit = 2000;
  hasLoggedIn: Boolean = false;
  me: User

  sliders = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "assets/img/caraousel2.png",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/img/caraousel1.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/img/caraousel2.png",
    }
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform: Platform,
    public toastCtrl: ToastController,
    public userData: UserData,
    public userApi: UserApi) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.userData.getUser().then((user: User)=> {
      if (user) {
        this.me = user
        if (user.profilePicture == "storages/missing/missing-image.png") {
          this.me.profilePicture = undefined
        }
      }
    })
  }

  backButtonAction() {
    var time = new Date().getTime();
    if (time - this.lastTimeBackPress < this.timePeriodToExit) {
      this.platform.exitApp();
    } else {
      let toast = this.toastCtrl.create({
        message: 'Tekan back sekali lagi untuk keluar',
        duration: 3000,
        position: 'bottom'
      })

      toast.present();
      this.lastTimeBackPress = new Date().getTime();
    }
  }

  openMenu(index) {
    switch (index) {
      case 0:
        this.navCtrl.push(PhotographyPage);
        break;
      case 1:
        this.navCtrl.push(EventOrganizerPage)
        break;
      case 2:
        this.navCtrl.push(SchoolsPage)
        break;
      case 3:
        this.navCtrl.push(SchoolsPage)
        break;
      case 4:
        this.navCtrl.push(SchoolsPage)
        break;
    }
    
  }

  goToProfile(){
    this.navCtrl.push(MyProfilePage)
  }

}
