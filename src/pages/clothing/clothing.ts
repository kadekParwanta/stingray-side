import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ToastController, Refresher } from 'ionic-angular';
import { Clothing, Media, Promotion } from '../../app/shared/sdk/models';
import { ClothingApi, PromotionApi } from '../../app/shared/sdk/services';
import { AppSettings } from '../../providers/app-setting';
import { AbstractBasePage } from '../base/base';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the ClothingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-clothing',
  templateUrl: 'clothing.html',
})
export class ClothingPage extends AbstractBasePage {

  private isBusy: Boolean = true
  private clothings: Array<Clothing> = new Array<Clothing>()
  private promotions: Array<Promotion> = new Array<Promotion>()

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ngZone: NgZone,
    public network: Network,
    public clothingApi: ClothingApi,
    public promotionApi: PromotionApi,
    public toastCtrl: ToastController) {
    super(network, ngZone)
  }

  initData(): void {
    this.getClothings().then((clothings: Array<Clothing>) => {
      this.populateClothings(clothings)
      this.getPromotions().then((promotions: Array<Promotion>) => {
        this.promotions = promotions
      })
    })
  }

  getClothings(start: number = 0) {
    this.isBusy = true
    this.clothings.length = 0
    return this.clothingApi.find({ include: 'photos' })
      .map((clothings: Array<Clothing>) => { return clothings })
      .toPromise()
  }

  getPromotions() {
    return this.promotionApi.find({
      where: { 'type': 'CLOTHING' },
      limit: 1,
      include: [
        { relation: 'photos' }
      ]
    })
      .map((promotions: Array<Promotion>) => { return promotions })
      .toPromise()
  }

  populateClothings(clothings: Array<Clothing>) {
    this.clothings = clothings
    this.isBusy = false
  }

  doRefresh(refresher: Refresher) {
    this.getClothings().then(
      (clothings: Array<Clothing>) => {
        this.populateClothings(clothings)
        this.getPromotions().then((promotions: Array<Promotion>) => {
          this.promotions = promotions
          refresher.complete()
          const toast = this.toastCtrl.create(
            {
              message: 'Data sudah diperbaharui',
              duration: 3000
            })
          toast.present()
        })
      }
    )
  }

  getPictureURL(path): string {
    return AppSettings.API_ENDPOINT + path;
  }

}
