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

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    SchoolsPage,
    HomePage,
    SchoolDetailPage,
    GenerationDetailPage
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
    GenerationDetailPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
