import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { School, Media } from '../../app/shared/sdk/models';
import { SchoolApi } from '../../app/shared/sdk/services';
import { SchoolDetailPage } from '../school-detail/school-detail';
import { ZBar } from 'ionic-native';
import { AppSettings } from '../../providers/app-setting';

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
  filteredSchools = new Array<School>()
  grid: Array<Array<School>>
  searchQuery: string = ''
  perpage:number = 10
  private start:number=0

  constructor(public navCtrl: NavController, public navParams: NavParams, private schoolApi: SchoolApi) {
    this.getSchools(this.start).then((schools: Array<School>) => {
      this.populateSchools(schools)
    })
  }

  populateSchools(schools: Array<School>) {
    for (var i = 0; i < schools.length; i++) {
        var schoolData = schools[i]
        var photos = schoolData.photos
        if (photos.length > 0) {
          var photo = photos[0].url
          schoolData.photos[0].url = AppSettings.API_ENDPOINT + photo
        } else {
          var media = new Media()
          media.url = AppSettings.API_ENDPOINT+'/storages/missing/placeholder.jpg'
          var medias = new Array<Media>()
          medias.push(media)
          schoolData.photos = medias
        }

        this.schools.push(schoolData)
      }
      this.filteredSchools = this.schools
      this.iterateSchool()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchoolsPage');
  }

  getSchools(start: number = 0) {
    return new Promise(resolve => {
      this.schoolApi.find({ skip: start, limit: this.perpage, include: ['photos', 'generations'] }).subscribe(
        (schools: Array<School>) => {
          resolve(schools);
        })
    })
  }

  iterateSchool() {
    let rowNum = 0; //counter to iterate over the rows in the grid
    this.grid = Array(Math.ceil(this.filteredSchools.length / 2));
    for (let i = 0; i < this.filteredSchools.length; i += 2) { //iterate schools

      this.grid[rowNum] = Array(2); //declare two elements per row

      if (this.filteredSchools[i]) { //check file URI exists
        this.grid[rowNum][0] = this.filteredSchools[i] //insert image
      }

      if (this.filteredSchools[i + 1]) { //repeat for the second image
        this.grid[rowNum][1] = this.filteredSchools[i + 1]
      } else {
        this.grid[rowNum].length = 1
      }

      rowNum++; //go on to the next row
    }
  }

  getItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filteredSchools = this.schools.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.iterateSchool()
    }
  }

  OnClearSearch(event:any){
    this.filteredSchools = this.schools
    this.iterateSchool()
  }

  goToDetails(school) {
    this.navCtrl.push(SchoolDetailPage, { school: school });
  }

  scan() {
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

  loadMoreSchool(infiniteScroll) {
     this.start+=10;
     
     this.getSchools().then((schools: Array<School>)=>{
       this.populateSchools(schools)
       infiniteScroll.complete();
     });
  }

}
