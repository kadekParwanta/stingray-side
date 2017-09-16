import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Refresher, Toast, ToastController, AlertController } from 'ionic-angular'; 
import { Network } from '@ionic-native/network'
import { AbstractBasePage } from '../base/base';
import { User, Order } from '../../app/shared/sdk/models';
import { UserApi } from '../../app/shared/sdk/services';
import { UserData } from '../../providers/user-data';
import { AppSettings } from '../../providers/app-setting';
import { GenerationDetailPage } from '../generation-detail/generation-detail';  

/**
 * Generated class for the MyProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage extends AbstractBasePage{

  private isBusy: Boolean = true
  private userProfile: User

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userApi: UserApi,
    public network: Network,
    public ngZone: NgZone,
    public userData: UserData,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
      super(network, ngZone)
  }

  initData(): void {
    this.getProfile().then(
      (data : User) => {
      this.populateData(data)
    })
  }

  getProfile() {
    this.isBusy = true
    return this.userData.getUser().then((user: User) => {
      return this.userApi.findById(user.id, {include:[{'orders':{'yearbooks':['school','photos']}},{'students':{'class':{'generation':'school'}}}]})
      .map((user: User) => { return user})
      .toPromise()
    })
  }

  populateData(res) {
    this.userProfile = res
    this.userProfile.profilePicture = AppSettings.API_ENDPOINT + "/"+ res.profilePicture
    this.isBusy = false
  }

  getPictureURL(path): string {
    return AppSettings.API_ENDPOINT + path;
  }

  getStatus(status) : string {
    switch(status) {
      case "NEW" : {
        return "Belum lunas"
      }
      case "IN_PROGRESS" : {
        return "Sedang diproses"
      }

      case "COMPLETED" : {
        return "Lunas"
      }
    }
  }

  doRefresh(refresher: Refresher) {
    this.getProfile().then((data)=>{
      this.populateData(data)
      refresher.complete()
      const toast = this.toastCtrl.create({
              message: 'Data sudah diperbaharui',
              duration: 3000
            })
      toast.present()
    })
  }

  gotoGenerationDetails(order: Order) {
    if (order.status == "NEW") {
      this.showAlert("Maaf", "Mohon lakukan pembayaran.",["OK"])
    } else if (order.status == "IN_PROGRESS") {
      this.showAlert("Maaf", "Pesanan Anda sedang kami proses. Silahkan kontak kami jika ada pertanyaan",["OK"])
    } else {
      let generationId = order.yearbooks[0].id
      this.navCtrl.push(GenerationDetailPage, {generationId:generationId})
    }
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
