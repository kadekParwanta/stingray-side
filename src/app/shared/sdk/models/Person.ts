/* tslint:disable */
import {
  Media
} from '../index';

declare var Object: any;
export interface PersonInterface {
  name: string;
  phonenumber?: string;
  address?: string;
  id?: any;
  photo?: Media;
}

export class Person implements PersonInterface {
  name: string;
  phonenumber: string;
  address: string;
  id: any;
  photo: Media;
  constructor(data?: PersonInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Person`.
   */
  public static getModelName() {
    return "Person";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Person for dynamic purposes.
  **/
  public static factory(data: PersonInterface): Person{
    return new Person(data);
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
      name: 'Person',
      plural: 'People',
      properties: {
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
      },
      relations: {
        photo: {
          name: 'photo',
          type: 'Media',
          model: 'Media'
        },
      }
    }
  }
}
