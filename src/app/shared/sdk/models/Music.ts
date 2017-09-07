/* tslint:disable */
import {
  Media
} from '../index';

declare var Object: any;
export interface MusicInterface {
  "artist"?: string;
  "length"?: number;
  "name"?: string;
  "description"?: string;
  "createdDate"?: Date;
  "finishDate"?: Date;
  "id"?: any;
  photos?: Media[];
}

export class Music implements MusicInterface {
  "artist": string;
  "length": number;
  "name": string;
  "description": string;
  "createdDate": Date;
  "finishDate": Date;
  "id": any;
  photos: Media[];
  constructor(data?: MusicInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Music`.
   */
  public static getModelName() {
    return "Music";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Music for dynamic purposes.
  **/
  public static factory(data: MusicInterface): Music{
    return new Music(data);
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
      name: 'Music',
      plural: 'Music',
      path: 'Music',
      properties: {
        "artist": {
          name: 'artist',
          type: 'string'
        },
        "length": {
          name: 'length',
          type: 'number'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "createdDate": {
          name: 'createdDate',
          type: 'Date'
        },
        "finishDate": {
          name: 'finishDate',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        photos: {
          name: 'photos',
          type: 'Media[]',
          model: 'Media'
        },
      }
    }
  }
}
