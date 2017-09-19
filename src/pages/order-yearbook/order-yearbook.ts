import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { Generation, Order, User } from '../../app/shared/sdk/models';
import { GenerationApi, OrderApi } from '../../app/shared/sdk/services';
import { UserData } from '../../providers/user-data';

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
  order: Order = new Order()

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public generationApi: GenerationApi,
    public userData: UserData,
    public orderApi: OrderApi,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController) {
      this.generation = navParams.get('generation');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderYearbookPage');
    this.userData.getUser().then((user: User)=>{
      this.order.type = "YEARBOOK"
      this.order.userId = user.id
      //TODO price should be validated or created from server
      this.order.price = 1.1 * this.generation.price
    })
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

  submit(event) {
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });

    loading.present();
    this.orderApi.create(this.order).subscribe(res => {
      this.orderApi.linkYearbooks(res.id, this.generation.id).subscribe(resp => {
        loading.dismiss()
        this.back()
        this.showAlert("Sukses","Pesanan anda sedang diproses. CS kami akan segera menghubuni Anda",["OK"])
      })
    })
  }

  back() {
    this.navCtrl.pop()
  }

  showAlert(title: string, subTitle: string, buttons: Array<string>) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

}
