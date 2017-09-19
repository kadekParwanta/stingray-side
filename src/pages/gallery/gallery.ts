import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { AbstractBasePage } from '../base/base';
import { Network } from '@ionic-native/network';
import { Class, Media, Generation, School , Student} from '../../app/shared/sdk/models';
import { ClassApi } from '../../app/shared/sdk/services';
import { AppSettings } from '../../providers/app-setting';
import { ImageLoader } from 'ionic-image-loader';
import { PhotoViewer } from '@ionic-native/photo-viewer';
declare var $: any

/**
 * Generated class for the GalleryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage extends AbstractBasePage {

  private classRoomId: String
  private classRoom = new Class()
  private isBusy: Boolean = true
  private photos = new Array<Media>()

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public classApi: ClassApi,
    public imageViewer: PhotoViewer,
    public imgLoader: ImageLoader,
    public network: Network,
    public menuCtrl: MenuController,
    public ngZone: NgZone) {
      super(network, ngZone)
      this.classRoomId = navParams.get('classRoomId');
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }
    
  initData() {
    this.getClassDetails(this.classRoomId).then((classRoom:Class) => {
      this.populateClassRoom(classRoom)
    })
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter GalleryPage")
    this.menuCtrl.enable(false);
    this.initSlickJQuery()
  }

  initSlickJQuery() {
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider-nav'
    });

    $('.slider-nav').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: true,
      centerMode: true,
      focusOnSelect: true
    });
  }

  getClassDetails(classRoomId) {
    this.isBusy = true
    return this.classApi.findById(classRoomId, {
      include: [
        {
          relation: 'photos'
        },
        {
          relation: 'students', scope: {
            order: "name ASC",
            include: {relation:"photo"}
          }
        },
        {
          relation: 'generation', scope: {
            include: {relation: 'school'}
          }
        }
      ]
    })
    .map((classRoom: Class) => { return classRoom})
    .toPromise()
  }

  populateClassRoom(classRoom:Class) {
    this.classRoom = classRoom

    let photos = classRoom.photos
    if (photos.length > 0) {
      for (var i = 0; i < photos.length; i++) {
        let photo = photos[i]
        this.classRoom.photos[i].url = AppSettings.API_ENDPOINT + photo.url
      }
    } else {
      var media = new Media()
      media.url = 'assets/img/placeholder.jpg'
      var medias = new Array<Media>()
      medias.push(media)
      this.classRoom.photos = medias
    }

    this.photos = this.classRoom.photos;
    this.isBusy = false
  }

  openPhotoViewer(url) {
    this.imgLoader.getImagePath(url).then(
      path => {this.imageViewer.show(path)},
      fallbackPath => {this.imageViewer.show(fallbackPath)}
    )
  }

}
