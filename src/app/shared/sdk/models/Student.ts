/* tslint:disable */
import {
  Media,
  Class
} from '../index';

declare var Object: any;
export interface StudentInterface {
  "motto"?: string;
  "NIS"?: string;
  "noAbsen"?: number;
  "noFotoIn"?: number;
  "panggilan"?: string;
  "ttl"?: string;
  "email"?: string;
  "instagram"?: string;
  "line"?: string;
  "hobi"?: string;
  "citacita"?: string;
  "quote"?: string;
  "name": string;
  "phonenumber"?: string;
  "address"?: string;
  "id"?: any;
  "userId"?: any;
  "classId"?: any;
  photo?: Media;
  class?: Class;
}

export class Student implements StudentInterface {
  "motto": string;
  "NIS": string;
  "noAbsen": number;
  "noFotoIn": number;
  "panggilan": string;
  "ttl": string;
  "email": string;
  "instagram": string;
  "line": string;
  "hobi": string;
  "citacita": string;
  "quote": string;
  "name": string;
  "phonenumber": string;
  "address": string;
  "id": any;
  "userId": any;
  "classId": any;
  photo: Media;
  class: Class;
  constructor(data?: StudentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Student`.
   */
  public static getModelName() {
    return "Student";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Student for dynamic purposes.
  **/
  public static factory(data: StudentInterface): Student{
    return new Student(data);
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
      name: 'Student',
      plural: 'Students',
      path: 'Students',
      properties: {
        "motto": {
          name: 'motto',
          type: 'string'
        },
        "NIS": {
          name: 'NIS',
          type: 'string'
        },
        "noAbsen": {
          name: 'noAbsen',
          type: 'number'
        },
        "noFotoIn": {
          name: 'noFotoIn',
          type: 'number'
        },
        "panggilan": {
          name: 'panggilan',
          type: 'string'
        },
        "ttl": {
          name: 'ttl',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "instagram": {
          name: 'instagram',
          type: 'string'
        },
        "line": {
          name: 'line',
          type: 'string'
        },
        "hobi": {
          name: 'hobi',
          type: 'string'
        },
        "citacita": {
          name: 'citacita',
          type: 'string'
        },
        "quote": {
          name: 'quote',
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
        "userId": {
          name: 'userId',
          type: 'any'
        },
        "classId": {
          name: 'classId',
          type: 'any'
        },
      },
      relations: {
        photo: {
          name: 'photo',
          type: 'Media',
          model: 'Media'
        },
        class: {
          name: 'class',
          type: 'Class',
          model: 'Class'
        },
      }
    }
  }
}
