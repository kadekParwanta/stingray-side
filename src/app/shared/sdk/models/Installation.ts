/* tslint:disable */

declare var Object: any;
export interface InstallationInterface {
  appId: string;
  appVersion?: string;
  badge?: number;
  created?: Date;
  deviceToken: string;
  deviceType: string;
  modified?: Date;
  status?: string;
  subscriptions?: Array<string>;
  timeZone?: string;
  userId?: string;
  id?: any;
}

export class Installation implements InstallationInterface {
  appId: string;
  appVersion: string;
  badge: number;
  created: Date;
  deviceToken: string;
  deviceType: string;
  modified: Date;
  status: string;
  subscriptions: Array<string>;
  timeZone: string;
  userId: string;
  id: any;
  constructor(data?: InstallationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Installation`.
   */
  public static getModelName() {
    return "Installation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Installation for dynamic purposes.
  **/
  public static factory(data: InstallationInterface): Installation{
    return new Installation(data);
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
      name: 'Installation',
      plural: 'Installations',
      properties: {
        appId: {
          name: 'appId',
          type: 'string'
        },
        appVersion: {
          name: 'appVersion',
          type: 'string'
        },
        badge: {
          name: 'badge',
          type: 'number'
        },
        created: {
          name: 'created',
          type: 'Date'
        },
        deviceToken: {
          name: 'deviceToken',
          type: 'string'
        },
        deviceType: {
          name: 'deviceType',
          type: 'string'
        },
        modified: {
          name: 'modified',
          type: 'Date'
        },
        status: {
          name: 'status',
          type: 'string'
        },
        subscriptions: {
          name: 'subscriptions',
          type: 'Array&lt;string&gt;'
        },
        timeZone: {
          name: 'timeZone',
          type: 'string'
        },
        userId: {
          name: 'userId',
          type: 'string'
        },
        id: {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
