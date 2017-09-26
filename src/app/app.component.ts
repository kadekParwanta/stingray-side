import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Nav, Platform, Events, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoopBackConfig, User, LoopBackAuth } from './shared/sdk';
import { SchoolsPage } from '../pages/schools/schools';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { UserData } from '../providers/user-data';
import { AppSettings } from '../providers/app-setting';
import { PhotographyPage } from '../pages/photography/photography';
import { EventOrganizerPage } from '../pages/event-organizer/event-organizer';
import { ImageLoaderConfig, ImageLoader } from 'ionic-image-loader';
import { AppUpdate } from '@ionic-native/app-update';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { ClothingPage } from '../pages/clothing/clothing';
import { MusicPage } from '../pages/music/music';
import { BuddyListPage } from '../pages/buddy-list/buddy-list';
import { ChatService } from '../providers/chat-service';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnDestroy {

  ngOnDestroy() {
    this.chatService.disconnect();
  }

  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  hasLoggedIn: Boolean;
  isAdmin: Boolean;
  navigationPages: PageInterface[] = [
    { title: 'Home', component: HomePage, icon: 'home' },
    { title: 'Yearbook', component: SchoolsPage, index: 1, icon: 'book' },
    { title: 'Photography', component: PhotographyPage, index: 2, icon: 'camera' },
    { title: 'Events', component: EventOrganizerPage, index: 3, icon: 'key' },
    { title: 'Clothing', component: ClothingPage, index: 4, icon: 'body' },
    { title: 'Music', component: MusicPage, index: 4, icon: 'musical-notes' },
  ]

  accountPages: PageInterface[] = []

  footerPage: PageInterface;

  loggedInPage: PageInterface = { title: 'Logout', component: HomePage, icon: 'log-out', logsOut: true };
  loggedOutPage: PageInterface = { title: 'Login', component: LoginPage, icon: 'log-in' };

  constructor(
    public platform: Platform,
    public userData: UserData,
    public events: Events,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private imageLoaderConfig: ImageLoaderConfig,
    private appUpdate: AppUpdate,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private chatService: ChatService,
    private loopbackAuth: LoopBackAuth,
    public imageLoader: ImageLoader) {


    this.footerPage = this.loggedOutPage;
    this.userData.checkHasSeenTutorial()
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = TutorialPage;
        }
        this.initializeApp();
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //Loopback
      LoopBackConfig.setBaseURL(AppSettings.API_ENDPOINT);
      LoopBackConfig.setApiVersion('api');

      //Image Loader
      this.imageLoaderConfig.setFallbackUrl('assets/img/placeholder.jpg');
      this.imageLoaderConfig.useImageTag(true);

      //App Update
      const updateUrl = 'https://kadekparwanta.github.io/stingray/stingray.xml';
      this.appUpdate.checkAppUpdate(updateUrl);



      // decide which menu items should be hidden by current login status stored in local storage
      this.userData.hasLoggedIn().then((hasLoggedIn) => {
        this.hasLoggedIn = hasLoggedIn;
        if (hasLoggedIn) {
          this.footerPage = this.loggedInPage;
          this.userData.getUser().then((user: User) => {
            if (user) {
              let role = user.roleName as any
              this.isAdmin = (role == "admin")
              this.setAccountPages(true, this.isAdmin)
            }
          })
        } else {
          this.footerPage = this.loggedOutPage;
          this.setAccountPages(false, false)
        }
      });



      this.listenToLoginEvents();
      this.platform.registerBackButtonAction(() => {
        let activeView: ViewController = this.nav.getActive();
        if (activeView != null) {
          if (this.nav.canGoBack()) {
            this.nav.pop();
          } else if (typeof activeView.instance.backButtonAction === 'function') {
            activeView.instance.backButtonAction();
          } else {
            this.nav.parent.select(0);
          }
        }
      })

    });
  }

  openPage(page: PageInterface) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      let loading = this.loadingCtrl.create({
        content: 'Please Wait...'
      });
      loading.present();

      setTimeout(() => {
        this.userData.logout();
        this.imageLoader.clearCache();
        this.nav.setRoot(page.component);
        loading.dismiss();
        this.presentAlert()
      }, 1000);
    } else if (page.title == 'Home') {
      this.nav.setRoot(page.component);
    } else {
      this.nav.push(page.component);
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', (data: any) => {
      this.footerPage = this.loggedInPage;
      this.setAccountPages(true, data.isAdmin)
    });

    this.events.subscribe('user:signup', () => {
      this.footerPage = this.loggedOutPage;
      this.setAccountPages(false, false)
    });

    this.events.subscribe('user:logout', () => {
      this.footerPage = this.loggedOutPage;
      this.setAccountPages(false, false)
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sukses',
      subTitle: 'Anda berhasil logout',
      buttons: ['OK']
    });
    alert.present();
  }

  setAccountPages(isLoggedIn: Boolean, isAdmin: Boolean) {
    if (isLoggedIn) {
      this.connectToSocketIO()
      if (isAdmin) {
        this.accountPages = [
          { title: 'My Profile', component: MyProfilePage, index: 0, icon: 'contact' },
          { title: 'Chat Us', component: BuddyListPage, index: 4, icon: 'chatbubbles' },
        ]
      } else {
        this.accountPages = [
          { title: 'My Profile', component: MyProfilePage, index: 0, icon: 'contact' },
          { title: 'Chat Us', component: ContactUsPage, index: 4, icon: 'chatbubbles' },
        ]
      }
    } else {
      this.chatService.disconnect()
      this.accountPages = [
        { title: 'Chat Us', component: ContactUsPage, index: 4, icon: 'chatbubbles' },
      ]
    }
  }

  connectToSocketIO() {
    let accessTookenId = this.loopbackAuth.getAccessTokenId()
    let userId = this.loopbackAuth.getCurrentUserId()

    this.chatService.authenticate({ id: accessTookenId, userId: userId })
  }
}
