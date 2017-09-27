import { Component, NgZone, Directive, Input } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, Validator, FormControl, FormArray } from '@angular/forms';
import { UsernameValidator } from '../../app/validators/username';
import { EmailValidator } from '../../app/validators/email';
import { PasswordValidator } from '../../app/validators/password';
import { User, School, Generation, Class, Student } from '../../app/shared/sdk/models';
import { UserApi, SchoolApi, StudentApi } from '../../app/shared/sdk/services';
import { UserData } from '../../providers/user-data';
import { Network } from '@ionic-native/network';
import { AbstractBasePage } from '../base/base';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login'
import { AppSettings } from '../../providers/app-setting';

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
  selectedSchools: Array<School> = new Array<School>()
  selectedGenerations: Array<Generation> = new Array<Generation>()
  selectedClasses: Array<Class> = new Array<Class>()
  selectedSchool: School = new School()
  selectedGeneration: Generation = new Generation()
  selectedClass: Class = new Class()
  createdUserId: String;
  isItYou: boolean = false
  students: Array<any>
  myStudent: Student
  studentName: string
  isSearched: boolean
  isSkipped: boolean
  selectedIndex: number

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userApi: UserApi,
    public schoolApi: SchoolApi,
    public studentApi: StudentApi,
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
      if (this.currentStep == 2) {
        this.getStudentsByEmail(this.signupForm.value["email"])
        this.updateStepCondition(2)
      } 
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
    const control = <FormArray>this.schoolForm.controls['schools']
    control.push(this.initSchools())
  }

  removeSchool(i: number) {
    const control = <FormArray>this.schoolForm.controls['schools']
    control.removeAt(i)
  }

  onSchoolSelect(index: number, selectedValue: any) {
    this.selectedSchool = this.findSchoolById(selectedValue);
    this.selectedSchools[index] = this.selectedSchool
  }

  onGenerationSelect(schoolIdx: number, selectedValue: any) {
    this.selectedGeneration = this.findGenerationById(selectedValue)
    this.selectedGenerations[schoolIdx] = this.selectedGeneration
  }

  onClassSelect(schoolIdx: number, selectedValue: any) {
    this.selectedClass = this.findClassById(selectedValue)
    this.selectedClasses[schoolIdx] = this.selectedClass
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

  updateStepCondition(step: number) {
    if (step == 1) {
      this.stepCondition = this.signupForm.controls.email.valid &&
      this.signupForm.controls.password.valid &&
      this.signupForm.controls.confirmPassword.valid
    } if (step == 2) {
      this.stepCondition = (this.myStudent || this.isSkipped);
    }
    
  }

  subcribeToFormChanges() {
    // initialize stream
    const myFormValueChanges$ = this.signupForm.valueChanges;

    // subscribe to the stream 
    myFormValueChanges$.subscribe(x => {
      this.updateStepCondition(1);
    });
  }

  onFinish() {
    this.submitAttempt = true;
    if (this.signupForm.valid) {
      let loading = this.loadingCtrl.create({
        content: 'Please Wait...'
      });

      loading.present();

      let schoolIds = []
      let generationIds = []
      let classIds = []
      let studentIds = []
      // if (this.selectedSchools.length > 0) {
      //   let schools = this.schoolForm.value["schools"]
      //   schools.forEach(element => {
      //     schoolIds.push(element['id'])
      //     let generations = element.generations
      //     generations.forEach(generation => {
      //       generationIds.push(generation['id'])
      //       let classes = generation.classes
      //       classes.forEach(classroom => {
      //         classIds.push(classroom['id'])
      //         let students = classroom.students
      //         students.forEach(student => {
      //           studentIds.push(student['id'])
      //         });
      //       });
      //     });
      //   });
      // }

      if (this.myStudent) {
        studentIds.push(this.myStudent.id)
        classIds.push(this.myStudent.class.id)
        generationIds.push(this.myStudent.class.generation.id)
        schoolIds.push(this.myStudent.class.generation.school.id)
      }


      let newUSer = {
        email: this.signupForm.value["email"],
        username: this.signupForm.value["email"],
        password: this.signupForm.value["password"],
        confirmPassword: this.signupForm.value["confirmPassword"],
        unverifiedSchools: schoolIds,
        unverifiedGenerations: generationIds,
        unverifiedClasses: classIds,
        unverifiedStudents: studentIds
      }

      this.userApi.create(newUSer).subscribe(
        (res: any) => {
          this.createdUserId = res.id;
          this.userData.signup(this.signupForm.value["email"], this.signupForm.value["password"]);
          loading.dismiss();

          this.alertCtrl.create({
            message: 'Data Anda sedang diverifikasi.',
            title: 'Selamat',
            buttons: [{
              text: 'OK',
              handler: data => {
                this.navCtrl.setRoot(HomePage)
              }
            }]
          }).present();
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

  initData() {
    this.schoolApi.find({ include: { generations: { classes: 'students' } } }).subscribe(
      (schools: Array<School>) => {
        this.schools = schools
      })
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

  getStudentsByEmail(email:string) {
    this.studentApi.findOne({where : {email: email}}).subscribe((res: Student) => {
      if (res) {
        this.studentName = res.name
        this.searchStudent()
      }
    })
  }

  searchStudent() {
    this.isSearched = true
    if (this.studentName) {
      this.students = []
      var pattern = new RegExp('.*'+this.studentName+'.*','i');
      this.studentApi.find({where : {and: [{userId: {exists:false}},{name: {like: this.studentName, options:'i'}}]}, include: ['photo', {class : {generation: 'school'}}], limit:5}).subscribe((res: Array<Student>) => {
        if (res) {
          this.students = res
        } 
      })
    }
  }

  getPictureURL(path: string): string {
    return AppSettings.API_ENDPOINT  + path
  }

  selectStudent(student: Student, index: number) {
    this.students[index].selected = true
    this.selectedIndex = index
    this.myStudent = student
    this.updateStepCondition(2);
  }

  skipStudent() {
    this.isSkipped = true
    if (this.selectedIndex >= 0) this.students[this.selectedIndex].selected = false
    this.updateStepCondition(2);
  }

}
