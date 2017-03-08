/* tslint:disable */
import {
  Student,
  Media,
  Generation
} from '../index';

declare var Object: any;
export interface ClassInterface {
  name: string;
  id?: any;
  generationId?: any;
  students?: Student[];
  photos?: Media[];
  generation?: Generation;
}

export class Class implements ClassInterface {
  name: string;
  id: any;
  generationId: any;
  students: Student[];
  photos: Media[];
  generation: Generation;
  constructor(data?: ClassInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Class`.
   */
  public static getModelName() {
    return "Class";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Class for dynamic purposes.
  **/
  public static factory(data: ClassInterface): Class{
    return new Class(data);
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
      name: 'Class',
      plural: 'Classes',
      properties: {
        name: {
          name: 'name',
          type: 'string'
        },
        id: {
          name: 'id',
          type: 'any'
        },
        generationId: {
          name: 'generationId',
          type: 'any'
        },
      },
      relations: {
        students: {
          name: 'students',
          type: 'Student[]',
          model: 'Student'
        },
        photos: {
          name: 'photos',
          type: 'Media[]',
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
