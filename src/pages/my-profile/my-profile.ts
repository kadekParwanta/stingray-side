import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Refresher } from 'ionic-angular'; 
import { Network } from '@ionic-native/network'
import { AbstractBasePage } from '../base/base';
import { User } from '../../app/shared/sdk/models';
import { UserApi } from '../../app/shared/sdk/services';
import { UserData } from '../../providers/user-data';
import { AppSettings } from '../../providers/app-setting';

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
    public userData: UserData) {
      super(network, ngZone)
  }

  initData(): void {
    this.getProfile()
  }

  getProfile() {
    this.isBusy = true
    this.userData.getUser().then((user: User) => {
      this.userApi.findById(user.id, {include:[{'orders':{'yearbooks':['school','photos']}},{'students':{'class':{'generation':'school'}}}]}).subscribe((res: User) => {
        this.userProfile = res
        this.userProfile.profilePicture = AppSettings.API_ENDPOINT + "/"+ this.userProfile.profilePicture
        this.isBusy = false
      })
    })
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

  }

}
