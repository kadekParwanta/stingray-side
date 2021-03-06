import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, Platform, ToastController, Events} from 'ionic-angular';
import { SchoolsPage } from '../schools/schools';
import { PhotographyPage } from '../photography/photography';
import { EventOrganizerPage } from '../event-organizer/event-organizer';
import { User, Message, Room } from '../../app/shared/sdk/models';
import { UserApi, RoomApi, MessageApi } from '../../app/shared/sdk/services';
import { UserData } from '../../providers/user-data';
import { ChatService } from '../../providers/chat-service';
import { MyProfilePage } from '../my-profile/my-profile'
import { ContactUsPage } from '../contact-us/contact-us'
import { ClothingPage } from '../clothing/clothing';
import { MusicPage } from '../music/music';
import { BuddyListPage } from '../buddy-list/buddy-list';
import { AppSettings } from '../../providers/app-setting';
import { LocalNotifications } from '@ionic-native/local-notifications';

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
  rooms: [Room]
  singleRoom: Room
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
    public messageApi: MessageApi,
    public chatService: ChatService,
    private localNotifications: LocalNotifications,
    public events: Events) {
      
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
          this.roomApi.find().subscribe((rooms: [Room]) => {
            this.rooms = rooms
            rooms.forEach(room => {
              this.listenToNewMessage(room)
            })
          })

          this.messageApi.find({where : {and: [{status: 'delivered'},{userId: {neq: this.me.id}}]}}).subscribe((messages: [Message]) => {
            this.newMessages = messages
          })

        } else {
          this.userData.getRoom().then((room:Room) => {
            this.singleRoom = room
            this.listenToNewMessage(room)
            this.messageApi.find({where : {and: [{status: 'delivered'},{userId: {neq: this.me.id}}]}}).subscribe((messages: [Message]) => {
              this.newMessages = messages
            })
          })
        }        
      }
    })
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter HomePage');
    if (this.isAdmin) {
      this.getDeliveredMessage()
    } else {
      if (this.singleRoom) {
        this.getDeliveredMessage()
      }
    }
  }

  getDeliveredMessage() {
    this.messageApi.find({where : {and: [{status: 'delivered'},{userId: {neq: this.me.id}}]}}).subscribe((messages: [Message]) => {
      this.newMessages = messages
    })
  }

  listenToNewMessage(room: Room) {
    this.events.subscribe('new-message-'+room.name,(message: Message) => {
      console.log("new message", message)
      if (message.userId != this.me.id) {
        this.newMessages.push(message)
      }
    })
    
  }

  // ionViewWillLeave() {
  //   if (this.isAdmin) {
  //     if (this.rooms) {
  //       this.rooms.forEach(room => {
  //         this.chatService.removeEventListener(room.name)
  //       })
  //     }
  //   } else {
  //     if (this.singleRoom) this.chatService.removeEventListener(this.singleRoom.name)
  //   }

  // }

  ionViewDidLeave() {
    this.newMessages.length = 0
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
      this.navCtrl.push(BuddyListPage, {newMessages: this.newMessages})
    } else {
      this.navCtrl.push(ContactUsPage)
    }
  }

  getPictureURL(path): string {
    return AppSettings.API_ENDPOINT + "/" + path;
  }

}
