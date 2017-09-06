import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, Platform } from 'ionic-angular';
import { SchoolsPage } from '../schools/schools';
import { PhotographyPage } from '../photography/photography';
import { EventOrganizerPage } from '../event-organizer/event-organizer';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  backButtonAction() {
    this.platform.exitApp();
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

}
