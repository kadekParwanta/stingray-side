import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { User } from '../../app/shared/sdk/models';
import { UserApi } from '../../app/shared/sdk/services';

/**
 * Generated class for the EditAccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html',
})
export class EditAccountPage {

  private userId: string
  private firstName: string
  private lastName: string

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public userApi: UserApi,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController) {
    this.userId = this.navParams.get("userId")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAccountPage');
  }

  updateName(fullName: string) {
    let lastSpaceIndex = fullName.lastIndexOf(" ")
    this.firstName = fullName.substr(0, lastSpaceIndex)
    this.lastName = fullName.substr(lastSpaceIndex, fullName.length)
    if (lastSpaceIndex < 0) {
      this.firstName = fullName
      this.lastName = ""
    }

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });

    loading.present();

    this.userApi.updateAttributes(this.userId, {
      firstName : this.firstName,
      lastName: this.lastName
    }).subscribe((user : any) => {
      loading.dismiss();
      this.viewCtrl.dismiss()
    }, err => {
      console.error(err);
      loading.dismiss();
      this.showAlert(err.name, err.message, ["OK"]);
      this.viewCtrl.dismiss()
    })
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
