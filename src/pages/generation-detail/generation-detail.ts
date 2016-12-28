import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Generation, Media } from '../../app/shared/sdk/models';
import { GenerationApi } from '../../app/shared/sdk/services';

/*
  Generated class for the GenerationDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-generation-detail',
  templateUrl: 'generation-detail.html'
})
export class GenerationDetailPage {
  generation: Generation
  private shownItem

  constructor(public navCtrl: NavController, public navParams: NavParams, public generationApi: GenerationApi) {
    this.generation = navParams.get('generation');
  }

  ionViewDidLoad() {
    this.getGenerationDetails(this.generation)
    console.log('ionViewDidLoad GenerationDetailPage');
  }

  mySlideOptions = {
    autoplay: 2000,
    loop: true,
    pager: true
  };

  getGenerationDetails(generation) {
    this.generationApi.findById(generation.id, {include:['photos', {classes:[{students:'photo'}, 'photos']}]}).subscribe(
      (generation: Generation) => {
        this.generation = generation
        let photos = generation.photos
          if (!photos){
            var media = new Media()
            media.url = 'http://ec2-35-160-136-100.us-west-2.compute.amazonaws.com/storages/missing/placeholder.jpg'
            var medias = new Array<Media>()
            medias.push(media)
            this.generation.photos = medias
          }
      },
      err => {
        if (err.status == 404) {
          console.log('This school does not have a generations. :(');
        } else {
          console.error(err);
        }
      },
      () => console.log('getDetails completed')
    )
  }

  toggleItem(classRoom) {
    if (this.isItemShown(classRoom)) {
      this.shownItem = null
    } else {
      this.shownItem = classRoom
    }
  }

  isItemShown(classRoom): Boolean  {
    return this.shownItem === classRoom;
  }

}
