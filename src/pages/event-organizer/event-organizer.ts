import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventOrganizer, Media } from '../../app/shared/sdk/models';
import { EventOrganizerApi } from '../../app/shared/sdk/services';
import { AppSettings } from '../../providers/app-setting';
import { HomePage } from '../home/home';

/*
  Generated class for the EventOrganizer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-organizer',
  templateUrl: 'event-organizer.html'
})
export class EventOrganizerPage {

  private events = Array<EventOrganizer>();

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventOrganizerApi: EventOrganizerApi) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventOrganizerPage');
    this.getEvents();
  }
  
  backButtonAction() {
    this.navCtrl.setRoot(HomePage);
  }

  getEvents() {
    this.eventOrganizerApi.find({include:'photos'}).subscribe(
      (events: Array<EventOrganizer>) => {
        for (var i = 0; i < events.length; i++) {
          var eventData = events[i]
          var photos = eventData.photos
          if (photos.length > 0) {
            var photo = photos[0].url
            eventData.photos[0].url = AppSettings.API_ENDPOINT+photo
          } else {
            var media = new Media()
            media.url = AppSettings.API_ENDPOINT+'/storages/missing/placeholder.jpg'
            var medias = new Array<Media>()
            medias.push(media)
            eventData.photos = medias
          }

          this.events.push(eventData)
        }
      },
      err => {
        if (err.status == 404) {
          console.log('Could not find eventData. :(');
        } else {
          console.error(err);
        }
      },
      () => console.log('getDetails completed')
    )
  }

}
