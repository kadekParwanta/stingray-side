import { Component, NgZone, Directive, Input } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, Validator, FormControl } from '@angular/forms';
import { UsernameValidator } from '../../app/validators/username';
import { EmailValidator } from '../../app/validators/email';
import { PasswordValidator } from '../../app/validators/password';
import { User, School } from '../../app/shared/sdk/models';
import { UserApi, SchoolApi } from '../../app/shared/sdk/services';
import { UserData } from '../../providers/user-data';
import { Network } from '@ionic-native/network';
import { AbstractBasePage } from '../base/base';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage extends AbstractBasePage {

  signupForm: FormGroup;
  submitAttempt: boolean = false;

  step: any;
  stepCondition: any;
  stepDefaultCondition: any;
  currentStep: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userApi: UserApi,
    public schoolApi: SchoolApi,
    public userData: UserData,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public network: Network,
    public ngZone: NgZone,
    public evts: Events) {
    super(network, ngZone)
    this.signupForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required]), EmailValidator.createValidator(this.userApi)],
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')]), UsernameValidator.checkUsername],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
        validator: PasswordValidator.MatchPassword
      });

    /**
     * Step Wizard Settings
     */
    this.step = 1;//The value of the first step, always 1
    this.stepCondition = false;
    this.stepDefaultCondition = true;//Save the default condition for every step
    //You can subscribe to the Event 'step:changed' to handle the current step
    this.evts.subscribe('step:changed', step => {
      //Handle the current step if you need
      this.currentStep = step;
      //Set the step condition to the default value
      this.stepCondition = this.stepDefaultCondition;
    });
    this.evts.subscribe('step:next', () => {
      //Do something if next
      console.log('Next pressed: ', this.currentStep);
    });
    this.evts.subscribe('step:back', () => {
      //Do something if back
      console.log('Back pressed: ', this.currentStep);
    });
    this.subcribeToFormChanges()
  }

  updateStepCondition() {
    this.stepCondition = this.signupForm.controls.email.valid &&
      this.signupForm.controls.password.valid &&
      this.signupForm.controls.confirmPassword.valid;
  }

  subcribeToFormChanges() {
    // initialize stream
    const myFormValueChanges$ = this.signupForm.valueChanges;

    // subscribe to the stream 
    myFormValueChanges$.subscribe(x => {
      this.updateStepCondition();
    });
  }

  onFinish() {
    this.alertCtrl.create({
      message: 'Wizard Finished!!',
      title: 'Congrats!!',
      buttons: [{
        text: 'Ok'
      }]
    }).present();
  }

  initData() {

  }

  save() {
    this.submitAttempt = true;
    if (this.signupForm.valid) {
      let loading = this.loadingCtrl.create({
        content: 'Please Wait...'
      });

      loading.present();

      let newUSer = {
        email: this.signupForm.value["email"],
        username: this.signupForm.value["email"],
        password: this.signupForm.value["password"]
      }

      this.userApi.create(newUSer).subscribe(
        (res) => {
          this.userData.signup(this.signupForm.value["email"], this.signupForm.value["password"]);
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
