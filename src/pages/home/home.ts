import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, Platform, ToastController, Events} from 'ionic-angular';
import { SchoolsPage } from '../schools/schools';
import { PhotographyPage } from '../photography/photography';
import { EventOrganizerPage } from '../event-organizer/event-organizer';
import { User, Message } from '../../app/shared/sdk/models';
import { UserApi, RoomApi } from '../../app/shared/sdk/services';
import { UserData } from '../../providers/user-data';
import { MyProfilePage } from '../my-profile/my-profile'
import { ContactUsPage } from '../contact-us/contact-us'
import { ClothingPage } from '../clothing/clothing';
import { MusicPage } from '../music/music';
import { BuddyListPage } from '../buddy-list/buddy-list';
import { AppSettings } from '../../providers/app-setting';

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
  newMessages: Array<Message> = Array<Message>()
  isAdmin: boolean
  roomCount: number

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
    public userApi: UserApi,
    public roomApi: RoomApi,
    public events: Events) {
      this.events.subscribe('new-message',(res) => {
        console.log("new message", res.message)
        this.newMessages.push(res.message)
      })
     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.userData.getUser().then((user: User)=> {
      if (user) {
        this.me = user
        let role = user.roleName as any
        this.isAdmin = (role == "admin")
        if (user.profilePicture == "storages/missing/missing-image.png") {
          this.me.profilePicture = undefined
        }

        if (this.isAdmin) {
          this.roomApi.count().subscribe(res => {
            this.roomCount = res.count
          })
        }        
      }
    })
  }

  getMessageCount(): number {
    if (this.isAdmin) {
      return this.newMessages.length / this.roomCount
    } else {
      return this.newMessages.length
    }
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
        this.navCtrl.push(ClothingPage)
        break;
      case 4:
        this.navCtrl.push(MusicPage)
        break;
    }
    
  }

  goToProfile(){
    this.navCtrl.push(MyProfilePage)
  }

  goToChat(){
    if (this.isAdmin) {
      this.navCtrl.push(BuddyListPage)
    } else {
      this.navCtrl.push(ContactUsPage)
    }
  }

  getPictureURL(path): string {
    return AppSettings.API_ENDPOINT + "/" + path;
  }

}
