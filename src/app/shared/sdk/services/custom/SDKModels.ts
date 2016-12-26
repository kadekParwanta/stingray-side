/* tslint:disable */
import { Injectable } from '@angular/core';
import { Email } from '../../models/Email';
import { User } from '../../models/User';
import { Media } from '../../models/Media';
import { WebAppConfig } from '../../models/WebAppConfig';
import { Application } from '../../models/Application';
import { Installation } from '../../models/Installation';
import { Notification } from '../../models/Notification';
import { Push } from '../../models/Push';
import { PushNotification } from '../../models/PushNotification';
import { Container } from '../../models/Container';
import { Picture } from '../../models/Picture';
import { Person } from '../../models/Person';
import { Student } from '../../models/Student';
import { Teacher } from '../../models/Teacher';
import { Class } from '../../models/Class';
import { Generation } from '../../models/Generation';
import { School } from '../../models/School';
import { Yearbook } from '../../models/Yearbook';
import { Epub } from '../../models/Epub';
import { Epubpage } from '../../models/Epubpage';

@Injectable()
export class SDKModels {

  private models: { [name: string]: any } = {
    Email: Email,
    User: User,
    Media: Media,
    WebAppConfig: WebAppConfig,
    Application: Application,
    Installation: Installation,
    Notification: Notification,
    Push: Push,
    PushNotification: PushNotification,
    Container: Container,
    Picture: Picture,
    Person: Person,
    Student: Student,
    Teacher: Teacher,
    Class: Class,
    Generation: Generation,
    School: School,
    Yearbook: Yearbook,
    Epub: Epub,
    Epubpage: Epubpage,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }
}
