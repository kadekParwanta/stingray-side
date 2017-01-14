import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsernameValidator } from '../../app/validators/username';
import { User } from '../../app/shared/sdk/models';
import { UserApi } from '../../app/shared/sdk/services';
import { UserData } from '../../providers/user-data';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  signupForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userApi: UserApi,
    public userData: UserData,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    this.signupForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.required])],
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  save() {
    this.submitAttempt = true;
    if (this.signupForm.valid) {
      let loading = this.loadingCtrl.create({
        content: 'Loading Please Wait...'
      });

      loading.present();

      this.userApi.create(this.signupForm.value).subscribe(
        (res) => {
          this.userData.signup(this.signupForm.value["username"]);
          loading.dismiss();
          this.showAlert("Success", "Please verify your email before login", ["OK"]);
        },
        err => {
          console.error(err);
          loading.dismiss();
          this.showAlert(err.name, err.message, ["OK"]);
        },
        () => console.log('register success')
      )
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

}
