/* tslint:disable */
import {
  Media,
  Class
} from '../index';

declare var Object: any;
export interface StudentInterface {
  motto?: string;
  NIS?: string;
  name: string;
  phonenumber?: string;
  address?: string;
  id?: any;
  classId?: any;
  photo?: Media;
  class?: Class;
}

export class Student implements StudentInterface {
  motto: string;
  NIS: string;
  name: string;
  phonenumber: string;
  address: string;
  id: any;
  classId: any;
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
      properties: {
        motto: {
          name: 'motto',
          type: 'string'
        },
        NIS: {
          name: 'NIS',
          type: 'string'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        phonenumber: {
          name: 'phonenumber',
          type: 'string'
        },
        address: {
          name: 'address',
          type: 'string'
        },
        id: {
          name: 'id',
          type: 'any'
        },
        classId: {
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
