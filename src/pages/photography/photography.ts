import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Photography, Media } from '../../app/shared/sdk/models';
import { PhotographyApi } from '../../app/shared/sdk/services';

/*
  Generated class for the Photography page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-photography',
  templateUrl: 'photography.html'
})
export class PhotographyPage {

  private photographies = Array<Photography>();

  constructor(public navCtrl: NavController, public navParams: NavParams, private photographyApi: PhotographyApi) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotographyPage');
    this.getPhotographies();
  }

  getPhotographies() {
    this.photographyApi.find({include:'photos'}).subscribe(
      (photographies: Array<Photography>) => {
        for (var i = 0; i < photographies.length; i++) {
          var photographyData = photographies[i]
          var photos = photographyData.photos
          if (photos.length > 0) {
            var photo = photos[0].url
            photographyData.photos[0].url = 'http://ec2-35-160-136-100.us-west-2.compute.amazonaws.com'+photo
          } else {
            var media = new Media()
            media.url = 'http://ec2-35-160-136-100.us-west-2.compute.amazonaws.com/storages/missing/placeholder.jpg'
            var medias = new Array<Media>()
            medias.push(media)
            photographyData.photos = medias
          }

          this.photographies.push(photographyData)
        }
      },
      err => {
        if (err.status == 404) {
          console.log('Could not find anyphotographies. :(');
        } else {
          console.error(err);
        }
      },
      () => console.log('getDetails completed')
    )
  }

}
