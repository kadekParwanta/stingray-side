import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Class, Media, Generation, School } from '../../app/shared/sdk/models';
import { ClassApi } from '../../app/shared/sdk/services';
import { AppSettings } from '../../providers/app-setting';
import { StudentDetailPage } from '../student-detail/student-detail';

/*
  Generated class for the ClassDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-class-detail',
  templateUrl: 'class-detail.html'
})

export class ClassDetailPage {
  classRoom = new Class()
  generation = new Generation()
  school = new School()
  grid: Array<Array<Media>>
  photos = new Array<Media>()

  constructor(public navCtrl: NavController, public navParams: NavParams, public classApi: ClassApi) {
    let classRoomId = navParams.get('classRoomId');
    this.getClassDetails(classRoomId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassDetailPage');
  }

  getClassDetails(classRoomId) {
      this.classApi.findById(classRoomId, {
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
    }).subscribe(
      (classRoom: Class) => {
        this.classRoom = classRoom
        this.generation = classRoom.generation;
        this.school = this.generation.school;

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

        
          let students = classRoom.students

          for (var j = 0; j < students.length; j++) {
            let student = students[j]
            let photo = student.photo
            if (photo) {
              classRoom.students[j].photo.url = AppSettings.API_ENDPOINT + photo.url
            }

          }

      },
      err => {
        if (err.status == 404) {
          console.log('This class does not have students. :(');
        } else {
          console.error(err);
        }
      },
      () => {
        console.log('getDetails completed');
        this.iteratePhotos();
      }
    )
  }

  iteratePhotos() {
    let rowNum = 0; //counter to iterate over the rows in the grid
    this.grid = Array(Math.ceil(this.photos.length / 2));
    for (let i = 0; i < this.photos.length; i += 2) { //iterate schools

      this.grid[rowNum] = Array(2); //declare two elements per row

      if (this.photos[i]) { //check file URI exists
        this.grid[rowNum][0] = this.photos[i] //insert image
      }

      if (this.photos[i + 1]) { //repeat for the second image
        this.grid[rowNum][1] = this.photos[i + 1]
      } else {
        this.grid[rowNum].length = 1
      }

      rowNum++; //go on to the next row
    }
  }

  goToStudentDetails(student) {
    this.navCtrl.push(StudentDetailPage, {studentId: student.id});
  }

}
