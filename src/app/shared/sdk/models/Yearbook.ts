/* tslint:disable */
import {
  Epub
} from '../index';

declare var Object: any;
export interface YearbookInterface {
  "url": string;
  "name"?: string;
  "type"?: string;
  "format"?: string;
  "isProfilePicture"?: string;
  "dateCreated"?: Date;
  "userId"?: string;
  "container"?: string;
  "id"?: any;
  "generationId"?: any;
  epub?: Epub;
}

export class Yearbook implements YearbookInterface {
  "url": string;
  "name": string;
  "type": string;
  "format": string;
  "isProfilePicture": string;
  "dateCreated": Date;
  "userId": string;
  "container": string;
  "id": any;
  "generationId": any;
  epub: Epub;
  constructor(data?: YearbookInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Yearbook`.
   */
  public static getModelName() {
    return "Yearbook";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Yearbook for dynamic purposes.
  **/
  public static factory(data: YearbookInterface): Yearbook{
    return new Yearbook(data);
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
      name: 'Yearbook',
      plural: 'Yearbooks',
      path: 'Yearbooks',
      properties: {
        "url": {
          name: 'url',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "format": {
          name: 'format',
          type: 'string'
        },
        "isProfilePicture": {
          name: 'isProfilePicture',
          type: 'string'
        },
        "dateCreated": {
          name: 'dateCreated',
          type: 'Date'
        },
        "userId": {
          name: 'userId',
          type: 'string'
        },
        "container": {
          name: 'container',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "generationId": {
          name: 'generationId',
          type: 'any'
        },
      },
      relations: {
        epub: {
          name: 'epub',
          type: 'Epub',
          model: 'Epub'
        },
      }
    }
  }
}
