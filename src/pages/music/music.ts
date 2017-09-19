import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ToastController, Refresher } from 'ionic-angular';
import { Music, Media, Promotion } from '../../app/shared/sdk/models';
import { MusicApi, PromotionApi } from '../../app/shared/sdk/services';
import { AppSettings } from '../../providers/app-setting';
import { AbstractBasePage } from '../base/base';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the MusicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-music',
  templateUrl: 'music.html',
})
export class MusicPage extends AbstractBasePage {

  private isBusy: Boolean = true
  private musics: Array<Music> = new Array<Music>()
  private promotions: Array<Promotion> = new Array<Promotion>()

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ngZone: NgZone,
    public network: Network,
    public musicApi: MusicApi,
    public promotionApi: PromotionApi,
    public toastCtrl: ToastController) {
    super(network, ngZone)
  }

  initData(): void {
    this.getMusics().then((musics: Array<Music>) => {
      this.populateMusics(musics)
      this.getPromotions().then((promotions: Array<Promotion>) => {
        this.promotions = promotions
      })
    })
  }

  getMusics() {
    this.isBusy = true
    this.musics.length = 0
    return this.musicApi.find({ include: 'photos' })
      .map((musics: Array<Music>) => { return musics })
      .toPromise()
  }

  getPromotions() {
    return this.promotionApi.find({
      where: { 'type': 'MUSIC' },
      limit: 1,
      include: [
        { relation: 'photos' }
      ]
    })
      .map((promotions: Array<Promotion>) => { return promotions })
      .toPromise()
  }

  populateMusics(musics: Array<Music>) {
    this.musics = musics
    this.isBusy = false
  }

  doRefresh(refresher: Refresher) {
    this.getMusics().then(
      (musics: Array<Music>) => {
        this.populateMusics(musics)
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
