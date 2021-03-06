import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ZBar } from '@ionic-native/zbar';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { AppUpdate } from '@ionic-native/app-update';
import { Network } from '@ionic-native/network';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { VideoPlayer } from '@ionic-native/video-player'
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { LocalNotifications } from '@ionic-native/local-notifications';


//Helpers
import { SDKBrowserModule } from './shared/sdk';
import { IonicStorageModule } from '@ionic/storage';
import { ChatService } from '../providers/chat-service';
import { AppSettings } from '../providers/app-setting';
import { TextImage } from './widgets/text-img/text-img';
import { ColorGenerator } from './widgets/text-img/color-generator';
import { IonicImageLoader } from 'ionic-image-loader';
import {IonSimpleWizard} from '../pages/ion-simple-wizard/ion-simple-wizard.component'
import {IonSimpleWizardStep} from '../pages/ion-simple-wizard/ion-simple-wizard.step.component'
import {PasswordStrengthBarModule} from 'ng2-password-strength-bar'

import { SchoolsPage } from '../pages/schools/schools';
import { HomePage } from '../pages/home/home';
import { SchoolDetailPage } from '../pages/school-detail/school-detail';
import { GenerationDetailPage } from '../pages/generation-detail/generation-detail';
import { OrderYearbookPage } from '../pages/order-yearbook/order-yearbook';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { UserData } from '../providers/user-data';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { PhotographyPage } from '../pages/photography/photography';
import { EventOrganizerPage } from '../pages/event-organizer/event-organizer';
import { ClassDetailPage } from '../pages/class-detail/class-detail';
import { StudentDetailPage } from '../pages/student-detail/student-detail';
import { EpubPage } from '../pages/epub/epub';
import { TocPage } from '../pages/toc/toc';
import { SettingsPage } from '../pages/settings/settings';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { GalleryPage } from '../pages/gallery/gallery';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { ClothingPage } from '../pages/clothing/clothing';
import { EditAccountPage } from '../pages/edit-account/edit-account';
import { MusicPage } from '../pages/music/music';
import { BuddyListPage } from '../pages/buddy-list/buddy-list';


@NgModule({
  declarations: [
    MyApp,
    SchoolsPage,
    HomePage,
    SchoolDetailPage,
    GenerationDetailPage,
    OrderYearbookPage,
    RegisterPage,
    LoginPage,
    ContactUsPage,
    PhotographyPage,
    EventOrganizerPage,
    ClassDetailPage,
    StudentDetailPage,
    TextImage,
    IonSimpleWizard,
    IonSimpleWizardStep,
    EpubPage,
    TocPage,
    SettingsPage,
    TutorialPage,
    GalleryPage,
    MyProfilePage,
    ClothingPage,
    EditAccountPage,
    MusicPage,
    BuddyListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    SDKBrowserModule.forRoot(),
    IonicImageLoader.forRoot(),
    BrowserModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    PasswordStrengthBarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SchoolsPage,
    HomePage,
    SchoolDetailPage,
    GenerationDetailPage,
    OrderYearbookPage,
    RegisterPage,
    LoginPage,
    ContactUsPage,
    PhotographyPage,
    EventOrganizerPage,
    ClassDetailPage,
    StudentDetailPage,
    EpubPage,
    TocPage,
    SettingsPage,
    TutorialPage,
    GalleryPage,
    MyProfilePage,
    ClothingPage,
    EditAccountPage,
    MusicPage,
    BuddyListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    UserData, 
    ChatService,
    AppSettings, 
    ColorGenerator,
    ZBar,
    PhotoViewer,
    AppUpdate,
    Network,
    ScreenOrientation,
    Camera,
    FilePath,
    InAppBrowser,
    VideoPlayer,
    YoutubeVideoPlayer,
    LocalNotifications]
})
export class AppModule {}
