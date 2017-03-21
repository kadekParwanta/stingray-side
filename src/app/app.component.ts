import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoopBackConfig } from './shared/sdk';
import { SchoolsPage } from '../pages/schools/schools';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { UserData } from '../providers/user-data';
import { AppSettings } from '../providers/app-setting';
import { PhotographyPage } from '../pages/photography/photography';
import { EventOrganizerPage } from '../pages/event-organizer/event-organizer';

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
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  hasLoggedIn: Boolean;
  pages: PageInterface[] = [
    { title: 'Home', component: HomePage, icon: 'home' },
    { title: 'Yearbook', component: SchoolsPage, index: 1, icon: 'book' },
    { title: 'Photography', component: PhotographyPage, index: 2, icon: 'camera' },
    { title: 'Events', component: EventOrganizerPage, index: 3, icon: 'key' },
    { title: 'Chat Us', component: ContactUsPage, index: 4, icon: 'chatbubbles' },
  ]

  footerPage: PageInterface;

  loggedInPage: PageInterface = { title: 'Logout', component: HomePage, icon: 'log-out', logsOut: true };
  loggedOutPage: PageInterface = { title: 'Login', component: LoginPage, icon: 'log-in' };

  constructor(public platform: Platform, public userData: UserData, public events: Events) {
    this.initializeApp();

    this.footerPage = this.loggedOutPage;
    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.hasLoggedIn = hasLoggedIn;
      if (hasLoggedIn) {
        this.footerPage = this.loggedInPage;
      } else {
        this.footerPage = this.loggedOutPage;
      }
    });

    this.listenToLoginEvents();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      LoopBackConfig.setBaseURL(AppSettings.API_ENDPOINT);
      LoopBackConfig.setApiVersion('api');
    });
  }

  openPage(page: PageInterface) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      // TODO
      this.footerPage = this.loggedInPage;
    });

    this.events.subscribe('user:signup', () => {
      // TODO
      this.footerPage = this.loggedInPage;
    });

    this.events.subscribe('user:logout', () => {
      // TODO
      this.footerPage = this.loggedOutPage;
    });
  }
}
