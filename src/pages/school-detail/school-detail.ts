import { Component , NgZone} from '@angular/core';
import { NavController, NavParams, ToastController, Refresher, Events} from 'ionic-angular';
import { School, Generation, Media } from '../../app/shared/sdk/models';
import { SchoolApi } from '../../app/shared/sdk/services';
import { GenerationDetailPage } from '../generation-detail/generation-detail';  
import { AppSettings } from '../../providers/app-setting';
import { Network } from '@ionic-native/network'
import { AbstractBasePage } from '../base/base';

/*
  Generated class for the SchoolDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-school-detail',
  templateUrl: 'school-detail.html'
})
export class SchoolDetailPage extends AbstractBasePage {

  public school: School;
  private generations = new Array<Generation>()
  private isBusy: Boolean = true

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController,
    public events: Events,
    public schoolApi: SchoolApi,
    public network: Network,
    public ngZone: NgZone) {
      super(network, ngZone)
      this.school = navParams.get('school');
  }

  initData() {
    this.getGenerations(this.school).then(
      (generations: Array<Generation>) => {
        this.populateGenerations(generations)
      }
    )
  }

  getGenerations(school) {
    this.isBusy = true
    return this.schoolApi.getGenerations(school.id, {include:'photos'})
    .map((generations: Array<Generation>) => { return generations})
    .toPromise()

    // this.schoolApi.getGenerations(school.id, {include:'photos'}).subscribe(
    //   (generations: Array<Generation>) => {
    //     for (var i = 0; i < generations.length; i++) {
    //       var generationData = generations[i]
    //       var photos = generationData.photos
    //       if (photos.length > 0) {
    //         var photo = photos[0].url
    //         generationData.photos[0].url = AppSettings.API_ENDPOINT+photo
    //       } else {
    //         var media = new Media()
    //         media.url = 'assets/img/placeholder.jpg'
    //         var medias = new Array<Media>()
    //         medias.push(media)
    //         generationData.photos = medias
    //       }

    //       this.generations.push(generationData)
    //     }
    //   },
    //   err => {
    //     if (err.status == 404) {
    //       console.log('This school does not have a generations. :(');
    //     } else {
    //       console.error(err);
    //     }
    //   },
    //   () => console.log('getDetails completed')
    // )
  }

  populateGenerations(generations: Array<Generation>) {
    this.generations = new Array<Generation>()
    for (var i = 0; i < generations.length; i++) {
      var generationData = generations[i]
      var photos = generationData.photos
      if (photos.length > 0) {
        var photo = photos[0].url
        generationData.photos[0].url = AppSettings.API_ENDPOINT+photo
      } else {
        var media = new Media()
        media.url = 'assets/img/placeholder.jpg'
        var medias = new Array<Media>()
        medias.push(media)
        generationData.photos = medias
      }

      this.generations.push(generationData)
    }
    this.isBusy = false
  }

  goToDetails(generation) {
    this.navCtrl.push(GenerationDetailPage, { generationId: generation.id });
  }

  doRefresh(refresher: Refresher) {
    this.getGenerations(this.school).then(
      (generations: Array<Generation>) => {
        this.populateGenerations(generations)
        refresher.complete()
        
              const toast = this.toastCtrl.create({
                message: 'Data sudah diperbaharui',
                duration: 3000
              })
              toast.present()
      }
    )
  }

}
