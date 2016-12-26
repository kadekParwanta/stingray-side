import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { School, Media } from '../../app/shared/sdk/models';
import { SchoolApi } from '../../app/shared/sdk/services';

/*
  Generated class for the Schools page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-schools',
  templateUrl: 'schools.html'
})
export class SchoolsPage {

  private schools = new Array<School>()

  constructor(public navCtrl: NavController, public navParams: NavParams, private schoolApi: SchoolApi) {
    this.getSchools()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchoolsPage');
  }

  getSchools() {
    this.schoolApi.find({include:'photos'}).subscribe(
      (schools:Array<School>) => {
        
        for (var i = 0; i < schools.length; i++) {
          var schoolData = schools[i]
          var photos = schoolData.photos
          if (photos.length > 0) {
            var photo = photos[0].url
            schoolData.photos[0].url = 'http://ec2-35-160-136-100.us-west-2.compute.amazonaws.com'+photo
          } else {
            var media = new Media()
            media.url = 'http://ec2-35-160-136-100.us-west-2.compute.amazonaws.com/storages/missing/placeholder.jpg'
            var medias = new Array<Media>()
            medias.push(media)
            schoolData.photos = medias
          }

          this.schools.push(schoolData)
        }

      }
    )
  }

}
