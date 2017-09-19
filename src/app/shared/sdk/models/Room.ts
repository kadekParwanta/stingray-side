/* tslint:disable */
import {
  Message
} from '../index';

declare var Object: any;
export interface RoomInterface {
  "name": string;
  "id"?: any;
  messages?: Message[];
}

export class Room implements RoomInterface {
  "name": string;
  "id": any;
  messages: Message[];
  constructor(data?: RoomInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Room`.
   */
  public static getModelName() {
    return "Room";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Room for dynamic purposes.
  **/
  public static factory(data: RoomInterface): Room{
    return new Room(data);
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
      name: 'Room',
      plural: 'Rooms',
      path: 'Rooms',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        messages: {
          name: 'messages',
          type: 'Message[]',
          model: 'Message'
        },
      }
    }
  }
}
