import { Component, NgZone, Directive, Input } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, Validator, FormControl, FormArray } from '@angular/forms';
import { UsernameValidator } from '../../app/validators/username';
import { EmailValidator } from '../../app/validators/email';
import { PasswordValidator } from '../../app/validators/password';
import { User, School, Generation, Class, Student } from '../../app/shared/sdk/models';
import { UserApi, SchoolApi } from '../../app/shared/sdk/services';
import { UserData } from '../../providers/user-data';
import { Network } from '@ionic-native/network';
import { AbstractBasePage } from '../base/base';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login'

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
  schoolForm: FormGroup;
  submitAttempt: boolean = false;

  step: any;
  stepCondition: any;
  stepDefaultCondition: any;
  currentStep: any;
  barLabel = "Password strength"
  isPasswordModified = false
  schools: Array<School> = new Array<School>()
  selectedSchool: School = new School()
  selectedGeneration: Generation = new Generation()
  selectedClass: Class = new Class()

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
      email: ['', Validators.compose([Validators.required]), EmailValidator.createValidator(this.userApi)],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
        validator: PasswordValidator.MatchPassword
      });

      this.schoolForm = formBuilder.group({
        schools: formBuilder.array([
          this.initSchools()
        ])
      })

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
      if (this.currentStep == 2) this.save();
    });
    this.evts.subscribe('step:back', () => {
      //Do something if back
      console.log('Back pressed: ', this.currentStep);
    });
    this.subcribeToFormChanges()
  }

  initSchools() {
    return this.formBuilder.group({
      id: ['', Validators.required],
      generations: this.formBuilder.array([
        this.initGenerations()
      ])
    })
  }

  initGenerations() {
    return this.formBuilder.group({
      id: ['', Validators.required],
      classes: this.formBuilder.array([
        this.initClasses()
      ])
    })
  }

  initClasses() {
    return this.formBuilder.group({
      id: ['', Validators.required],
      students: this.formBuilder.array([
        this.initStudents()
      ])
    })
  }

  initStudents() {
    return this.formBuilder.group({
      id: ['', Validators.required]
    })
  }

  addSchool() {
    const control = <FormArray> this.schoolForm.controls['schools']
    control.push(this.initSchools())
  }

  removeSchool(i: number) {
    const control = <FormArray> this.schoolForm.controls['schools']
    control.removeAt(i)
  }

  onSchoolSelect(selectedValue: any) {
    console.log("selected", selectedValue);
    this.selectedSchool = this.findSchoolById(selectedValue);
  }

  onGenerationSelect(selectedValue: any) {
    console.log("selected", selectedValue)
    this.selectedGeneration = this.findGenerationById(selectedValue)
  }

  onClassSelect(selectedValue: any) {
    console.log("selected", selectedValue)
    this.selectedClass = this.findClassById(selectedValue)
  }

  findSchoolById(id: string): School {
    var school = new School()
    this.schools.forEach(element => {
      if (element.id == id) school = element
    });

    return school
  }

  findGenerationById(id: string): Generation {
    var generation = new Generation()
    this.selectedSchool.generations.forEach(element => {
      if (element.id == id) generation = element
    })
    return generation
  }

  findClassById(id: string): Class {
    var classRoom = new Class()
    this.selectedGeneration.classes.forEach(element => {
      if (element.id == id) classRoom = element
    })
    return classRoom
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
      message: 'Mohon cek email Anda untuk verifikasi',
      title: 'Selamat',
      buttons: [{
        text: 'OK',
        handler: data => {
          this.navCtrl.setRoot(HomePage)
        }
      }]
    }).present();
  }

  initData() {
    this.schoolApi.find({ include: {generations:{classes:'students'}}}).subscribe(
      (schools: Array<School>) => {
        this.schools = schools
      })
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
        password: this.signupForm.value["password"],
        confirmPassword: this.signupForm.value["confirmPassword"]
      }

      this.userApi.create(newUSer).subscribe(
        (res) => {
          this.userData.signup(this.signupForm.value["email"], this.signupForm.value["password"]);
          loading.dismiss();
        },
        err => {
          console.error(err);
          loading.dismiss();
          this.showAlert(err.name, err.message, ["OK"]);
        },
        () => console.log('register success')
      )
    } else {
      this.alertCtrl.create({
        message: 'Terjadi kesalahan',
        title: 'Mohon dicoba kembali',
        buttons: [{
          text: 'Ok'
        }]
      }).present();
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

  back() {
    this.navCtrl.getPrevious().data.emailFromRegister = this.signupForm.value['email']
    this.navCtrl.pop()
  }

  passwordChange() {
    this.isPasswordModified = false
  }

  passwordValueChange() {
    this.isPasswordModified = true
  }

}
