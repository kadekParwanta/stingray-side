import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ToastController, Refresher } from 'ionic-angular';
import { Class, Media, Generation, School, Student } from '../../app/shared/sdk/models';
import { ClassApi } from '../../app/shared/sdk/services';
import { AppSettings } from '../../providers/app-setting';
import { StudentDetailPage } from '../student-detail/student-detail';
import { GalleryPage } from '../gallery/gallery';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ImageLoader } from 'ionic-image-loader';
import { Network } from '@ionic-native/network';
import { AbstractBasePage } from '../base/base';

/*
  Generated class for the ClassDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-class-detail',
  templateUrl: 'class-detail.html'
})

export class ClassDetailPage extends AbstractBasePage {
  classRoom = new Class()
  generation = new Generation()
  school = new School()
  grid: Array<Array<Media>>
  photos = new Array<Media>()
  studentGroups = []
  classRoomId
  private isBusy: Boolean = true

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public classApi: ClassApi,
    public imageViewer: PhotoViewer,
    public imgLoader: ImageLoader,
    public network: Network,
    public ngZone: NgZone) {
    super(network, ngZone)
    this.classRoomId = navParams.get('classRoomId');
  }

  initData() {
    this.getClassDetails(this.classRoomId).then((classRoom: Class) => {
      this.populateClassRoom(classRoom)
    })
  }

  getClassDetails(classRoomId) {
    this.isBusy = true
    return this.classApi.findById(classRoomId, {
      include: [
        {
          relation: 'photos', scope: {
            limit: 3
          }
        },
        {
          relation: 'students', scope: {
            order: "name ASC",
            include: { relation: "photo" }
          }
        },
        {
          relation: 'generation', scope: {
            include: { relation: 'school' }
          }
        }
      ]
    })
      .map((classRoom: Class) => { return classRoom })
      .toPromise()

    //   this.classApi.findById(classRoomId, {
    //   include: [
    //     {
    //       relation: 'photos'
    //     },
    //     {
    //       relation: 'students', scope: {
    //         order: "name ASC",
    //         include: {relation:"photo"}
    //       }
    //     },
    //     {
    //       relation: 'generation', scope: {
    //         include: {relation: 'school'}
    //       }
    //     }
    //   ]
    // }).subscribe(
    //   (classRoom: Class) => {
    //     this.classRoom = classRoom
    //     this.generation = classRoom.generation;
    //     this.school = this.generation.school;

    //     let photos = classRoom.photos
    //     if (photos.length > 0) {
    //       for (var i = 0; i < photos.length; i++) {
    //         let photo = photos[i]
    //         this.classRoom.photos[i].url = AppSettings.API_ENDPOINT + photo.url
    //       }
    //     } else {
    //       var media = new Media()
    //       media.url = 'assets/img/placeholder.jpg'
    //       var medias = new Array<Media>()
    //       medias.push(media)
    //       this.classRoom.photos = medias
    //     }

    //     this.photos = this.classRoom.photos;


    //       let students = classRoom.students

    //       for (var j = 0; j < students.length; j++) {
    //         let student = students[j]
    //         let photo = student.photo
    //         if (photo) {
    //           classRoom.students[j].photo.url = AppSettings.API_ENDPOINT + photo.url
    //         }

    //       }

    //   },
    //   err => {
    //     if (err.status == 404) {
    //       console.log('This class does not have students. :(');
    //     } else {
    //       console.error(err);
    //     }
    //   },
    //   () => {
    //     console.log('getDetails completed');
    //     this.iteratePhotos();
    //   }
    // )
  }

  populateClassRoom(classRoom: Class) {
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
    this.groupStudents(students)
    this.iteratePhotos();
    this.isBusy = false
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
    this.navCtrl.push(StudentDetailPage, { studentId: student.id });
  }

  openPhotoViewer(url) {
    this.imgLoader.getImagePath(url).then(
      path => { this.imageViewer.show(path) },
      fallbackPath => { this.imageViewer.show(fallbackPath) }
    )
  }

  doRefresh(refresher: Refresher) {
    this.getClassDetails(this.classRoomId).then((classRoom: Class) => {
      this.populateClassRoom(classRoom)
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

  groupStudents(students: Array<Student>) {
    this.studentGroups = []
    let sortedStudents = students.sort(
      (a: Student, b: Student): number => {
        var ra = a.name.match(/\D+|\d+/g);
        var rb = b.name.match(/\D+|\d+/g);
        var r = 0;

        while (!r && ra.length && rb.length) {
          var x = ra.shift(), y = rb.shift(),
            nx = parseInt(x), ny = parseInt(y);

          if (isNaN(nx) || isNaN(ny))
            r = x > y ? 1 : (x < y ? -1 : 0);
          else
            r = nx - ny;
        }
        return r || ra.length - rb.length;
      }
    )
    let currentLetter = "";
    let currentStudents = [];

    sortedStudents.forEach((value, index) => {

      if (value.name.charAt(0) != currentLetter) {

        currentLetter = value.name.charAt(0);

        let newGroup = {
          letter: currentLetter,
          students: []
        };

        currentStudents = newGroup.students
        this.studentGroups.push(newGroup);

      }

      currentStudents.push(value);

    });

  }

  gotoGallery() {
    this.navCtrl.push(GalleryPage, { classRoomId: this.classRoomId })
  }

}
