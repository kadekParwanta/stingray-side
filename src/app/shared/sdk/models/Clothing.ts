/* tslint:disable */
import {
  Media
} from '../index';

declare var Object: any;
export interface ClothingInterface {
  type?: string;
  price?: number;
  name?: string;
  description?: string;
  createdDate?: Date;
  finishDate?: Date;
  id?: any;
  photos?: Media[];
}

export class Clothing implements ClothingInterface {
  type: string;
  price: number;
  name: string;
  description: string;
  createdDate: Date;
  finishDate: Date;
  id: any;
  photos: Media[];
  constructor(data?: ClothingInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Clothing`.
   */
  public static getModelName() {
    return "Clothing";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Clothing for dynamic purposes.
  **/
  public static factory(data: ClothingInterface): Clothing{
    return new Clothing(data);
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
      name: 'Clothing',
      plural: 'Clothings',
      properties: {
        type: {
          name: 'type',
          type: 'string'
        },
        price: {
          name: 'price',
          type: 'number'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        description: {
          name: 'description',
          type: 'string'
        },
        createdDate: {
          name: 'createdDate',
          type: 'Date'
        },
        finishDate: {
          name: 'finishDate',
          type: 'Date'
        },
        id: {
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
