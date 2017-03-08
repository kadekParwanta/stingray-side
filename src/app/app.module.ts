import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
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
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { Storage } from '@ionic/storage';
import { PhotographyPage } from '../pages/photography/photography';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    SchoolsPage,
    HomePage,
    SchoolDetailPage,
    GenerationDetailPage,
    OrderYearbookPage,
    RegisterPage,
    LoginPage,
    ContactUsPage,
    PhotographyPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    SDKBrowserModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    SchoolsPage,
    HomePage,
    SchoolDetailPage,
    GenerationDetailPage,
    OrderYearbookPage,
    RegisterPage,
    LoginPage,
    ContactUsPage,
    PhotographyPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, UserData, ChatService, Storage]
})
export class AppModule {}
