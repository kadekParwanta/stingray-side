import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Student, Media } from '../../app/shared/sdk/models';
import { StudentApi } from '../../app/shared/sdk/services';
import { AppSettings } from '../../providers/app-setting';
import { ColorGenerator } from '../../app/widgets/text-img/color-generator';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ImageLoader } from 'ionic-image-loader';

/*
  Generated class for the StudentDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-student-detail',
  templateUrl: 'student-detail.html',
  providers:[ColorGenerator]
})
export class StudentDetailPage {
  student = new Student()
  color: String
  style = {}
  contentStyle = {}
  rowStyle = {}

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public studentApi: StudentApi, 
    public colorGenerator: ColorGenerator,
    public imageViewer: PhotoViewer,
    public imgLoader: ImageLoader) {
      let studentId = navParams.get('studentId');
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
      this.student.phonenumber = student.phonenumber.replace(/\s+/g,'');
      let color = this.colorGenerator.getColor(student.name);
      this.contentStyle = {
        'background-color' : color
      }

      //add alpha in hex color
      this.rowStyle = {
        'background-color' : this.hex2rgba(color)
      }
      let photo = student.photo
      if (photo) {
        this.student.photo.url = AppSettings.API_ENDPOINT + photo.url
        this.style['background-image'] = "url("+this.student.photo.url+")"
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
  
    openPhotoViewer(url) {
      this.imgLoader.getImagePath(url).then(
        path => {this.imageViewer.show(path)},
        fallbackPath => {this.imageViewer.show(fallbackPath)}
      )
    }

    hex2rgba(hex: string) : string {
      var c;
      if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
          c= hex.substring(1).split('');
          if(c.length== 3){
              c= [c[0], c[0], c[1], c[1], c[2], c[2]];
          }
          c= '0x'+c.join('');
          return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.5)';
      }
      throw new Error('Bad Hex');
    }

}
