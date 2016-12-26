import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { SDKBrowserModule } from './shared/sdk';
import { SchoolsPage } from '../pages/schools/schools';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    SchoolsPage,
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
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
