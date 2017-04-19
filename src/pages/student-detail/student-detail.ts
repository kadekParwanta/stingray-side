import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Student, Media } from '../../app/shared/sdk/models';
import { StudentApi } from '../../app/shared/sdk/services';
import { AppSettings } from '../../providers/app-setting';

/*
  Generated class for the StudentDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-student-detail',
  templateUrl: 'student-detail.html'
})
export class StudentDetailPage {
  student = new Student()

  constructor(public navCtrl: NavController, public navParams: NavParams, public studentApi: StudentApi) {
    let studentId = navParams.get('studentId');
    console.log("studentId= " + studentId);
    let media = new Media()
    media.url = AppSettings.API_ENDPOINT + '/storages/missing/placeholder.jpg'
    this.student.photo = media
    this.getStudentDetail(studentId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentDetailPage');
  }

  getStudentDetail(studentId) {
    this.studentApi.findById(studentId, {
      include: [
        {
          relation: 'photo'
        }
      ]
    }).subscribe((student: Student) => {
      this.student = student;
      let photo = student.photo
      if (photo) {
        this.student.photo.url = AppSettings.API_ENDPOINT + photo.url
      } else {
        let media = new Media()
        media.url = AppSettings.API_ENDPOINT + '/storages/missing/placeholder.jpg'
        this.student.photo = media
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
      })
  }

}
