import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Generation } from '../../app/shared/sdk/models';
import { GenerationApi } from '../../app/shared/sdk/services';

/*
  Generated class for the OrderYearbook page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-order-yearbook',
  templateUrl: 'order-yearbook.html'
})
export class OrderYearbookPage {
  generation: Generation

  constructor(public navCtrl: NavController, public navParams: NavParams,  public generationApi: GenerationApi) {
    this.generation = navParams.get('generation');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderYearbookPage');
  }

  submit(event) {
    
  }

  back() {
    this.navCtrl.pop()
  }

}
