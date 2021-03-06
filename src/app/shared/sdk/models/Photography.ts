/* tslint:disable */
import {
  Media
} from '../index';

declare var Object: any;
export interface PhotographyInterface {
  "location"?: string;
  "topic"?: string;
  "name"?: string;
  "description"?: string;
  "createdDate"?: Date;
  "finishDate"?: Date;
  "id"?: any;
  photos?: Media[];
}

export class Photography implements PhotographyInterface {
  "location": string;
  "topic": string;
  "name": string;
  "description": string;
  "createdDate": Date;
  "finishDate": Date;
  "id": any;
  photos: Media[];
  constructor(data?: PhotographyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Photography`.
   */
  public static getModelName() {
    return "Photography";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Photography for dynamic purposes.
  **/
  public static factory(data: PhotographyInterface): Photography{
    return new Photography(data);
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
      name: 'Photography',
      plural: 'Photographies',
      path: 'Photographies',
      properties: {
        "location": {
          name: 'location',
          type: 'string'
        },
        "topic": {
          name: 'topic',
          type: 'string'
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
