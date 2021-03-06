import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, Refresher, Events, ModalController} from 'ionic-angular';
import { School, Media, Generation } from '../../app/shared/sdk/models';
import { SchoolApi, GenerationApi } from '../../app/shared/sdk/services';
import { SchoolDetailPage } from '../school-detail/school-detail';
import { GenerationDetailPage } from '../generation-detail/generation-detail';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { ZBar } from '@ionic-native/zbar';
import { AppSettings } from '../../providers/app-setting';
import { UserData } from '../../providers/user-data';
import { Network } from '@ionic-native/network';
import { AbstractBasePage } from '../base/base';


/*
  Generated class for the Schools page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-schools',
  templateUrl: 'schools.html'
})
export class SchoolsPage extends AbstractBasePage{

  private schools = new Array<School>()
  filteredSchools = new Array<School>()
  grid: Array<Array<School>>
  searchQuery: string = ''
  perpage:number = 10
  private start:number=0
  private isBusy: Boolean = true

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private schoolApi: SchoolApi,
    private generationApi: GenerationApi,
    public alertController: AlertController,
    public events: Events,
    private zbar: ZBar,
    public network: Network,
    public userdata: UserData,
    public modalCtrl: ModalController,
    public ngZone: NgZone) {
      super(network, ngZone)
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
          media.url = 'assets/img/placeholder.jpg'
          var medias = new Array<Media>()
          medias.push(media)
          schoolData.photos = medias
        }

        this.schools.push(schoolData)
      }
      this.filteredSchools = this.schools
      this.iterateSchool()
      this.isBusy = false
  }

  initData() {
    this.getSchools(this.start).then((schools: Array<School>) => {
      this.populateSchools(schools)
    })
  }

  getSchools(start: number = 0) {
    this.isBusy = true
    this.schools.length = 0
    return new Promise(resolve => {
      if (this.isConnected) {
        this.schoolApi.find({ skip: start, limit: this.perpage, include: ['photos', 'generations'], order:'isSample DESC' }).subscribe(
          (schools: Array<School>) => {
            resolve(schools);
          })
      } else {
        resolve(Array<School>());
      }
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
    } else {
      this.filteredSchools = this.schools
    }
    this.iterateSchool()
  }

  OnClearSearch(event:any){
    this.filteredSchools = this.schools
    this.iterateSchool()
  }

  goToDetails(school) {
    this.navCtrl.push(SchoolDetailPage, { school: school });
  }

  backButtonAction() {
    this.navCtrl.setRoot(HomePage);
  }

  scan() {
    let zBarOptions = {
      flash: "off",
      drawSight: false
    };
    
    this.zbar.scan(zBarOptions)
      .then(result => {
        console.log(result); // Scanned code
        this.generationApi.findByBarcode(result).subscribe(
          (generation: Generation) => {
            if (generation) {
              this.userdata.hasLoggedIn().then((hasLoggedIn: boolean) => {
                if (!hasLoggedIn) {
                  this.goToLogin(generation.id)
                } else {
                  this.navCtrl.push(GenerationDetailPage, { generationId: generation.id });
                }
              })
              
            } else {
              let errorAlert = this.alertController.create({
                title: 'Error',
                message: 'Data tidak ditemukan',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      console.log('OK');
                    }
                  }
                ]
              });
              errorAlert.present();
            }
            
          },
          err => {
            if (err.status == 404) {
              console.log('This generation is not exist. :(');
              let errorAlert = this.alertController.create({
                title: 'Error',
                message: 'Data tidak ditemukan',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      console.log('OK');
                    }
                  }
                ]
              });
              errorAlert.present();
            } else {
              console.error(err);
            }
          },
          () => console.log('getDetails completed'))
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

  doRefresh(refresher: Refresher) {
    this.getSchools(this.start).then((schools: Array<School>) => {
      this.populateSchools(schools)
      refresher.complete()

      const toast = this.toastCtrl.create({
        message: 'Data sudah diperbaharui',
        duration: 3000
      })

      toast.present()
    })
  }

  goToLogin(generationId: string) {
    let loginModal = this.modalCtrl.create(LoginPage, { generationId: generationId });
    loginModal.onDidDismiss(data => {
      console.log(data);
      if (data.success) {
        this.navCtrl.push(GenerationDetailPage, {generationId: generationId})
      } else if (data.register) {
        this.goToRegisterModal(generationId)
      }
    })
    loginModal.present();
  }



  goToRegisterModal(generationId: string) {
    let registerModal = this.modalCtrl.create(RegisterPage, { generationId: generationId });
    registerModal.onDidDismiss(data => {
      console.log(data);
      if (data.success) {
        this.navCtrl.push(GenerationDetailPage, {generationId: generationId})
      }
    })
    registerModal.present();
  }
}
