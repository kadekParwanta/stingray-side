import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ToastController, Refresher, AlertController } from 'ionic-angular';
import { Generation, Media, School, User } from '../../app/shared/sdk/models';
import { GenerationApi } from '../../app/shared/sdk/services';
import { OrderYearbookPage } from '../order-yearbook/order-yearbook';
import { ClassDetailPage } from '../class-detail/class-detail';
import { ZBar } from '@ionic-native/zbar';
import { AppSettings } from '../../providers/app-setting';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ImageLoader } from 'ionic-image-loader';
import { Network } from '@ionic-native/network';
import { AbstractBasePage } from '../base/base';
import { EpubPage } from '../epub/epub';
import { UserData } from '../../providers/user-data';

export class Book {
  label: string;
  file: string;
}

/*
  Generated class for the GenerationDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-generation-detail',
  templateUrl: 'generation-detail.html'
})
export class GenerationDetailPage extends AbstractBasePage{
  generation = new Generation()
  generationId: String
  school: School = new School()
  allowAccess: Boolean = false
  me: User
  private shownItem
  private isBusy: Boolean = true

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public generationApi: GenerationApi,
    public zbar: ZBar,
    public imageViewer: PhotoViewer,
    public imgLoader: ImageLoader,
    public network: Network,
    public ngZone: NgZone,
    public userData: UserData,
    public alertCtrl: AlertController) {
      super(network, ngZone)
      this.generationId = navParams.get('generationId');
      this.school.name = "";   
  }

  initData() {
    this.userData.getUser().then((user: User)=> {
      if (user) {
        this.me = user
        let role = user.roleName as any
        this.allowAccess = (role == "admin")
      } 
      this.getGenerationDetails(this.generationId).then((generation:Generation)=>{
        this.populateGenerationDetails(generation)
      })
    })
    
  }

  mySlideOptions = {
    autoplay: null,
    loop: false,
    pager: true
  };

  getGenerationDetails(generationId) {
    this.isBusy = true
    return this.generationApi.findById(generationId, {
      include: [
        {
          relation: 'photos'
        },
        {
          relation: 'school'
        },
        {
          relation: 'yearbook'
        },
        {
          relation: 'classes', scope: {
            include: [
              {
                relation: 'students'
              },
              {
                relation: 'photos'
                // , scope: {
                //   skip: 0,
                //   limit: 1,
                // }
              }
            ]
          }
        }
      ]
    })
    .map((generation: Generation) => { return generation})
    .toPromise()
    // this.generationApi.findById(generation.id, {
    //   include: [
    //     {
    //       relation: 'photos', scope: {
    //         skip: 0,
    //         limit: 2,
    //       }
    //     },
    //     {
    //       relation: 'classes', scope: {
    //         skip: 0,
    //         limit: 2,
    //         include: [
    //           {
    //             relation: 'students', scope: {
    //               skip: 0,
    //               limit: 5,
    //               include: { relation: 'photo' }
    //             }
    //           },
    //           {
    //             relation: 'photos', scope: {
    //               skip: 0,
    //               limit: 2,
    //             }
    //           }
    //         ]
    //       }
    //     }
    //   ]
    // }).subscribe(

    //   this.generationApi.findById(generationId, {
    //   include: [
    //     {
    //       relation: 'photos'
    //     },
    //     {
    //       relation: 'school'
    //     },
    //     {
    //       relation: 'classes', scope: {
    //         include: [
    //           {
    //             relation: 'students'
    //           },
    //           {
    //             relation: 'photos'
    //             // , scope: {
    //             //   skip: 0,
    //             //   limit: 1,
    //             // }
    //           }
    //         ]
    //       }
    //     }
    //   ]
    // }).subscribe(
    //   (generation: Generation) => {
    //     let school = generation.school
    //     if (school) {
    //       this.school = school
    //     }
    //     this.generation = generation

    //     let photos = generation.photos
    //     if (photos.length > 0) {
    //       for (var i = 0; i < photos.length; i++) {
    //         let photo = photos[i]
    //         this.generation.photos[i].url = AppSettings.API_ENDPOINT + photo.url
    //       }
    //     } else {
    //       var media = new Media()
    //       media.url = 'assets/img/placeholder.jpg'
    //       var medias = new Array<Media>()
    //       medias.push(media)
    //       this.generation.photos = medias
    //     }

    //     let classes = generation.classes
    //     for (var l = 0; l < classes.length; l++) {
    //       let classRoom = classes[l]
    //       let classPhotos = classRoom.photos
    //       if (classPhotos.length > 0) {
    //         for (var k = 0; k < classPhotos.length; k++) {
    //           let photo = classPhotos[k]
    //           classRoom.photos[k].url = AppSettings.API_ENDPOINT + photo.url
    //         }
    //       } else {
    //         media = new Media()
    //         media.url = 'assets/img/placeholder.jpg'
    //         medias = new Array<Media>()
    //         medias.push(media)
    //         classRoom.photos = medias
    //       }

    //       let students = classRoom.students

    //       for (var j = 0; j < students.length; j++) {
    //         let student = students[j]
    //         let photo = student.photo
    //         if (photo) {
    //           classRoom.students[j].photo.url = AppSettings.API_ENDPOINT + photo.url
    //         } else {
    //           let media = new Media()
    //           media.url = 'assets/img/placeholder.jpg'
    //           classRoom.students[j].photo = media
    //         }

    //       }
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

  populateGenerationDetails(generation: Generation) {
    let school = generation.school
    if (school) {
      this.school = school
    }
    this.generation = generation

    let photos = generation.photos
    if (photos.length > 0) {
      for (var i = 0; i < photos.length; i++) {
        let photo = photos[i]
        this.generation.photos[i].url = AppSettings.API_ENDPOINT + photo.url
      }
    } else {
      var media = new Media()
      media.url = 'assets/img/placeholder.jpg'
      var medias = new Array<Media>()
      medias.push(media)
      this.generation.photos = medias
    }

    let classes = generation.classes
    for (var l = 0; l < classes.length; l++) {
      let classRoom = classes[l]
      let classPhotos = classRoom.photos
      if (classPhotos.length > 0) {
        for (var k = 0; k < classPhotos.length; k++) {
          let photo = classPhotos[k]
          classRoom.photos[k].url = AppSettings.API_ENDPOINT + photo.url
        }
      } else {
        media = new Media()
        media.url = 'assets/img/placeholder.jpg'
        medias = new Array<Media>()
        medias.push(media)
        classRoom.photos = medias
      }

      let students = classRoom.students

      for (var j = 0; j < students.length; j++) {
        let student = students[j]
        if (this.me) {
          if (this.me.id == student.userId) this.allowAccess = true
        }
        let photo = student.photo
        if (photo) {
          classRoom.students[j].photo.url = AppSettings.API_ENDPOINT + photo.url
        } else {
          let media = new Media()
          media.url = 'assets/img/placeholder.jpg'
          classRoom.students[j].photo = media
        }

      }
    }

    if (school.isSample) this.allowAccess = true;
    this.isBusy = false
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

  order() {
    if (!this.me) {
      this.showAlert("Unauthorized","Mohon login untuk melanjutkan",["OK"])
    } else {
      //TODO
      this.navCtrl.push(OrderYearbookPage, {"generation":this.generation});
    }
  }

  goToClassDetails(classRoom) {
    if (!this.me) {
      this.showAlert("Unauthorized","Mohon login untuk melanjutkan",["OK"])
    } else if (!this.allowAccess) {
      this.showAlert("Data tidak ditemukan","Data anda tidak ditemukan di yearbook ini. Silahkan konfirmasi melalui contact us atau pesan dengan klik Order",["OK"])
    } else {
      this.navCtrl.push(ClassDetailPage, { classRoomId: classRoom.id });
    }
  }

  showAlert(title: string, subTitle: string, buttons: Array<string>) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons,
    });
    alert.present();
  }

  openPhotoViewer(url) {
    this.imgLoader.getImagePath(url).then(
      path => {this.imageViewer.show(path)},
      fallbackPath => {this.imageViewer.show(fallbackPath)}
    )
  }

  doRefresh(refresher: Refresher) {
    this.getGenerationDetails(this.generationId).then((generation:Generation)=>{
      this.populateGenerationDetails(generation)
      refresher.complete()
            const toast = this.toastCtrl.create({
              message: 'Data sudah diperbaharui',
              duration: 3000
            })
            toast.present()
    })
  }

  goToHome() {
    this.navCtrl.popToRoot()
  }

  read() {
    let book: Book = new Book()
    book.label = this.generation.school.name + " Angkatan " + this.generation.year
    book.file = AppSettings.API_ENDPOINT + this.generation.yearbook.url
    console.log('read', book);
    this.navCtrl.push(EpubPage, {
      book: book
    });
  }

}
