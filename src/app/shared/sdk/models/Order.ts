/* tslint:disable */
import {
  User,
  Generation
} from '../index';

declare var Object: any;
export interface OrderInterface {
  "type": string;
  "price": number;
  "recipientName": string;
  "recipientAddress": string;
  "recipientPhonenumber"?: string;
  "status": string;
  "id"?: any;
  "userId"?: any;
  owner?: User;
  yearbooks?: Generation[];
}

export class Order implements OrderInterface {
  "type": string;
  "price": number;
  "recipientName": string;
  "recipientAddress": string;
  "recipientPhonenumber": string;
  "status": string;
  "id": any;
  "userId": any;
  owner: User;
  yearbooks: Generation[];
  constructor(data?: OrderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Order`.
   */
  public static getModelName() {
    return "Order";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Order for dynamic purposes.
  **/
  public static factory(data: OrderInterface): Order{
    return new Order(data);
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
      name: 'Order',
      plural: 'Orders',
      path: 'Orders',
      properties: {
        "type": {
          name: 'type',
          type: 'string',
          default: 'YEARBOOK'
        },
        "price": {
          name: 'price',
          type: 'number',
          default: 0
        },
        "recipientName": {
          name: 'recipientName',
          type: 'string'
        },
        "recipientAddress": {
          name: 'recipientAddress',
          type: 'string'
        },
        "recipientPhonenumber": {
          name: 'recipientPhonenumber',
          type: 'string'
        },
        "status": {
          name: 'status',
          type: 'string',
          default: 'NEW'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "userId": {
          name: 'userId',
          type: 'any'
        },
      },
      relations: {
        owner: {
          name: 'owner',
          type: 'User',
          model: 'User'
        },
        yearbooks: {
          name: 'yearbooks',
          type: 'Generation[]',
          model: 'Generation'
        },
      }
    }
  }
}
