import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SDKBrowserModule } from './shared/sdk';
import { SchoolsPage } from '../pages/schools/schools';
import { HomePage } from '../pages/home/home';
import { SchoolDetailPage } from '../pages/school-detail/school-detail';
import { GenerationDetailPage } from '../pages/generation-detail/generation-detail';
import { OrderYearbookPage } from '../pages/order-yearbook/order-yearbook';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { UserData } from '../providers/user-data';
import { ChatService } from '../providers/chat-service';
import { AppSettings } from '../providers/app-setting';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { IonicStorageModule } from '@ionic/storage';
import { PhotographyPage } from '../pages/photography/photography';
import { EventOrganizerPage } from '../pages/event-organizer/event-organizer';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ClassDetailPage } from '../pages/class-detail/class-detail';
import { StudentDetailPage } from '../pages/student-detail/student-detail';
import { TextImage } from './widgets/text-img/text-img';
import { ColorGenerator } from './widgets/text-img/color-generator';
import { IonicImageLoader } from 'ionic-image-loader';
import { ZBar } from '@ionic-native/zbar';

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
    TextImage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    SDKBrowserModule.forRoot(),
    IonicImageLoader.forRoot(),
    BrowserModule,
    IonicImageViewerModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule
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
    StudentDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    UserData, 
    ChatService,
    AppSettings, 
    ColorGenerator,
    ZBar]
})
export class AppModule {}
