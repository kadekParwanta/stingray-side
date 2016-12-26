/* tslint:disable */
import {
  Media,
  School
} from '../index';

declare var Object: any;
export interface TeacherInterface {
  NIK?: string;
  name: string;
  phonenumber?: string;
  address?: string;
  id?: any;
  schoolId?: any;
  photo?: Media;
  school?: School;
}

export class Teacher implements TeacherInterface {
  NIK: string;
  name: string;
  phonenumber: string;
  address: string;
  id: any;
  schoolId: any;
  photo: Media;
  school: School;
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
      properties: {
        NIK: {
          name: 'NIK',
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
        schoolId: {
          name: 'schoolId',
          type: 'any'
        },
      },
      relations: {
        photo: {
          name: 'photo',
          type: 'Media',
          model: 'Media'
        },
        school: {
          name: 'school',
          type: 'School',
          model: 'School'
        },
      }
    }
  }
}
