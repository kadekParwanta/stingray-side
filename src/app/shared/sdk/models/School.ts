/* tslint:disable */
import {
  Generation,
  Media
} from '../index';

declare var Object: any;
export interface SchoolInterface {
  "name": string;
  "address"?: string;
  "profile"?: string;
  "hymne"?: string;
  "id"?: any;
  "userId"?: any;
  generations?: Generation[];
  photos?: Media[];
}

export class School implements SchoolInterface {
  "name": string;
  "address": string;
  "profile": string;
  "hymne": string;
  "id": any;
  "userId": any;
  generations: Generation[];
  photos: Media[];
  constructor(data?: SchoolInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `School`.
   */
  public static getModelName() {
    return "School";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of School for dynamic purposes.
  **/
  public static factory(data: SchoolInterface): School{
    return new School(data);
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
      name: 'School',
      plural: 'Schools',
      path: 'Schools',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "address": {
          name: 'address',
          type: 'string'
        },
        "profile": {
          name: 'profile',
          type: 'string'
        },
        "hymne": {
          name: 'hymne',
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
      },
      relations: {
        generations: {
          name: 'generations',
          type: 'Generation[]',
          model: 'Generation'
        },
        photos: {
          name: 'photos',
          type: 'Media[]',
          model: 'Media'
        },
      }
    }
  }
}
