/* tslint:disable */
import {
  User,
  Room
} from '../index';

declare var Object: any;
export interface MessageInterface {
  "text": string;
  "createdDate": Date;
  "status"?: string;
  "userName"?: string;
  "userAvatar"?: string;
  "id"?: any;
  "userId"?: any;
  "roomId"?: any;
  sender?: User;
  room?: Room;
}

export class Message implements MessageInterface {
  "text": string;
  "createdDate": Date;
  "status": string;
  "userName": string;
  "userAvatar": string;
  "id": any;
  "userId": any;
  "roomId": any;
  sender: User;
  room: Room;
  constructor(data?: MessageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Message`.
   */
  public static getModelName() {
    return "Message";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Message for dynamic purposes.
  **/
  public static factory(data: MessageInterface): Message{
    return new Message(data);
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
      name: 'Message',
      plural: 'Messages',
      path: 'Messages',
      properties: {
        "text": {
          name: 'text',
          type: 'string'
        },
        "createdDate": {
          name: 'createdDate',
          type: 'Date'
        },
        "status": {
          name: 'status',
          type: 'string'
        },
        "userName": {
          name: 'userName',
          type: 'string'
        },
        "userAvatar": {
          name: 'userAvatar',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "userId": {
          name: 'userId',
          type: 'any'
        },
        "roomId": {
          name: 'roomId',
          type: 'any'
        },
      },
      relations: {
        sender: {
          name: 'sender',
          type: 'User',
          model: 'User'
        },
        room: {
          name: 'room',
          type: 'Room',
          model: 'Room'
        },
      }
    }
  }
}
