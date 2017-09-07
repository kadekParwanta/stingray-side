/* tslint:disable */

declare var Object: any;
export interface PushNotificationInterface {
  "id"?: any;
}

export class PushNotification implements PushNotificationInterface {
  "id": any;
  constructor(data?: PushNotificationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PushNotification`.
   */
  public static getModelName() {
    return "PushNotification";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PushNotification for dynamic purposes.
  **/
  public static factory(data: PushNotificationInterface): PushNotification{
    return new PushNotification(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'PushNotification',
      plural: 'PushNotifications',
      path: 'PushNotifications',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
