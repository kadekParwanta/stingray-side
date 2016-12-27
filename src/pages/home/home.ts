import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { SchoolsPage } from '../schools/schools';

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

  @ViewChild('slider') slider: Slides;

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

  mySlideOptions = {
    autoplay: 2000,
    loop: true,
    pager: true
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  onSlideChanged() {
    // let currentIndex = this.slider.getActiveIndex();
    // console.log("Current index is", currentIndex);
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit My slider: ' + this.slider);
  }

  openMenu(index) {
    switch(index) {
      case 0: this.navCtrl.setRoot(SchoolsPage)
      case 1: this.navCtrl.setRoot(SchoolsPage)
      case 2: this.navCtrl.setRoot(SchoolsPage)
      case 3: this.navCtrl.setRoot(SchoolsPage)
      case 4: this.navCtrl.setRoot(SchoolsPage)
    }
    
  }

}
