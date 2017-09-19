import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Refresher, ToastController, AlertController, ActionSheetController, Loading, LoadingController, Platform, PopoverController } from 'ionic-angular';
import { Network } from '@ionic-native/network'
import { AbstractBasePage } from '../base/base';
import { User, Order } from '../../app/shared/sdk/models';
import { UserApi } from '../../app/shared/sdk/services';
import { UserData } from '../../providers/user-data';
import { AppSettings } from '../../providers/app-setting';
import { GenerationDetailPage } from '../generation-detail/generation-detail';
import { EditAccountPage } from '../edit-account/edit-account';

import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
declare var cordova: any;

/**
 * Generated class for the MyProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage extends AbstractBasePage {

  private isBusy: Boolean = true
  private userProfile: User
  lastImage: string = null;
  loading: Loading

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userApi: UserApi,
    public network: Network,
    public ngZone: NgZone,
    public userData: UserData,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController) {
    super(network, ngZone)
  }

  initData(): void {
    this.getProfile().then(
      (data: User) => {
        this.populateData(data)
      })
  }

  getProfile() {
    this.isBusy = true
    return this.userData.getUser().then((user: User) => {
      return this.userApi.findById(user.id, { include: [{ 'orders': { 'yearbooks': ['school', 'photos'] } }, { 'students': { 'class': { 'generation': 'school' } } }] })
        .map((user: User) => { return user })
        .toPromise()
    })
  }

  populateData(res) {
    this.userProfile = res
    this.userProfile.profilePicture = AppSettings.API_ENDPOINT + "/" + res.profilePicture
    this.isBusy = false
  }

  getPictureURL(path): string {
    return AppSettings.API_ENDPOINT + path;
  }

  getStatus(status): string {
    switch (status) {
      case "NEW": {
        return "Belum lunas"
      }
      case "IN_PROGRESS": {
        return "Sedang diproses"
      }

      case "COMPLETED": {
        return "Lunas"
      }
    }
  }

  doRefresh(refresher: Refresher) {
    this.getProfile().then((data) => {
      this.populateData(data)
      refresher.complete()
      const toast = this.toastCtrl.create({
        message: 'Data sudah diperbaharui',
        duration: 3000
      })
      toast.present()
    })
  }

  gotoGenerationDetails(order: Order) {
    if (order.status == "NEW") {
      this.showAlert("Maaf", "Mohon lakukan pembayaran.", ["OK"])
    } else if (order.status == "IN_PROGRESS") {
      this.showAlert("Maaf", "Pesanan Anda sedang kami proses. Silahkan kontak kami jika ada pertanyaan", ["OK"])
    } else {
      let generationId = order.yearbooks[0].id
      this.navCtrl.push(GenerationDetailPage, { generationId: generationId })
    }
  }

  showAlert(title: string, subTitle: string, buttons: Array<string>) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.uploadImage()
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    // Destination URL
    var url = AppSettings.API_ENDPOINT + "/users/" + this.userProfile.id + "/uploadProfilePicture";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename }
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
      this.getProfile().then((res) => {
        this.populateData(res)
      })
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }

  editAccount(ev) {
    let popover = this.popoverCtrl.create(EditAccountPage, {
      userId: this.userProfile.id
    });
    popover.onDidDismiss(data => {
      this.getProfile().then((data) => {
        this.populateData(data)
      })
    })
    popover.present({ ev });
  }
}
