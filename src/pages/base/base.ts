import { NgZone } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs/Subscription';

export abstract class AbstractBasePage {

  protected isConnected: Boolean = true
  protected isLoading: Boolean = false
  protected network: Network;
  protected ngZone: NgZone;
  disconnectSubscription: Subscription
  connectSubscription: Subscription

  constructor(
    network: Network,
    ngZone: NgZone) {
    this.network = network
    this.ngZone = ngZone
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad from AbstractBasePage');
    if (this.network.type == 'none' || this.network.type == 'unknown') this.isConnected = false
    this.initData();
  }

  ionViewDidEnter() {
    this.listenToNetworkEvents();
  }

  ionViewWillLeave() {
    this.connectSubscription.unsubscribe();
    this.disconnectSubscription.unsubscribe();
  }

  abstract initData(): void;

  listenToNetworkEvents() {
       this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.ngZone.run(() => {
          this.isConnected = false;
        })
      });

       this.connectSubscription = this.network.onConnect().subscribe(() => {
        // We just got a connection but we need to wait briefly
         // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        this.ngZone.run(() => {
          this.isLoading = true;
          setTimeout(() => {
            this.isLoading = false;
            this.isConnected = true;
            this.initData()
          }, 3000);
        })
      });
  }

}
