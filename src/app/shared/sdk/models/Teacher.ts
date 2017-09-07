/* tslint:disable */
import {
  Media,
  Generation
} from '../index';

declare var Object: any;
export interface TeacherInterface {
  "NIK"?: string;
  "name": string;
  "phonenumber"?: string;
  "address"?: string;
  "id"?: any;
  "generationId"?: any;
  photo?: Media;
  generation?: Generation;
}

export class Teacher implements TeacherInterface {
  "NIK": string;
  "name": string;
  "phonenumber": string;
  "address": string;
  "id": any;
  "generationId": any;
  photo: Media;
  generation: Generation;
  constructor(data?: TeacherInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Teacher`.
   */
  public static getModelName() {
    return "Teacher";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Teacher for dynamic purposes.
  **/
  public static factory(data: TeacherInterface): Teacher{
    return new Teacher(data);
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
      name: 'Teacher',
      plural: 'Teachers',
      path: 'Teachers',
      properties: {
        "NIK": {
          name: 'NIK',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "phonenumber": {
          name: 'phonenumber',
          type: 'string'
        },
        "address": {
          name: 'address',
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
        photo: {
          name: 'photo',
          type: 'Media',
          model: 'Media'
        },
        generation: {
          name: 'generation',
          type: 'Generation',
          model: 'Generation'
        },
      }
    }
  }
}
