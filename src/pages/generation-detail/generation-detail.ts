import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Generation, Media, School } from '../../app/shared/sdk/models';
import { GenerationApi } from '../../app/shared/sdk/services';
import { OrderYearbookPage } from '../order-yearbook/order-yearbook';
import { ClassDetailPage } from '../class-detail-page/class-detail-page';
import { ZBar } from 'ionic-native';
import { AppSettings } from '../../providers/app-setting';

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
  generationId: String
  school: School = new School()
  private shownItem

  constructor(public navCtrl: NavController, public navParams: NavParams, public generationApi: GenerationApi) {
    this.generationId = navParams.get('generationId');
    this.school.name = "";    
  }

  ionViewDidLoad() {
    this.getGenerationDetails(this.generationId)
    console.log('ionViewDidLoad GenerationDetailPage');
  }

  mySlideOptions = {
    autoplay: null,
    loop: false,
    pager: true
  };

  getGenerationDetails(generationId) {
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

      this.generationApi.findById(generationId, {
      include: [
        {
          relation: 'photos'
        },
        {
          relation: 'school'
        },
        {
          relation: 'classes', scope: {
            include: [
              {
                relation: 'students'
              },
              {
                relation: 'photos', scope: {
                  skip: 0,
                  limit: 1,
                }
              }
            ]
          }
        }
      ]
    }).subscribe(
      (generation: Generation) => {
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
          media.url = AppSettings.API_ENDPOINT+'/storages/missing/placeholder.jpg'
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
            var media = new Media()
            media.url = AppSettings.API_ENDPOINT+'/storages/missing/placeholder.jpg'
            var medias = new Array<Media>()
            medias.push(media)
            classRoom.photos = medias
          }

          let students = classRoom.students

          for (var j = 0; j < students.length; j++) {
            let student = students[j]
            let photo = student.photo
            if (photo) {
              classRoom.students[j].photo.url = AppSettings.API_ENDPOINT + photo.url
            } else {
              let media = new Media()
              media.url = AppSettings.API_ENDPOINT+'/storages/missing/placeholder.jpg'
              classRoom.students[j].photo = media
            }

          }
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

  order() {
    // this.navCtrl.push(OrderYearbookPage, { generation: this.generation });
    let zBarOptions = {
      flash: "off",
      drawSight: false
    };

    ZBar.scan(zBarOptions)
      .then(result => {
        console.log(result); // Scanned code
      })
      .catch(error => {
        console.log(error); // Error message
      });
  }

  goToStudentDetails(student) {
      this.order();
  }

  goToClassDetails(classRoom) {
    this.navCtrl.push(ClassDetailPage, { classRoomId: classRoom.id });
  }

}
