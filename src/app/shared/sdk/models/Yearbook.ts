/* tslint:disable */
import {
  Epub
} from '../index';

declare var Object: any;
export interface YearbookInterface {
  "coverUrl"?: string;
  "price"?: number;
  "name"?: string;
  "id"?: any;
  "generationId"?: any;
  epub?: Epub;
}

export class Yearbook implements YearbookInterface {
  "coverUrl": string;
  "price": number;
  "name": string;
  "id": any;
  "generationId": any;
  epub: Epub;
  constructor(data?: YearbookInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Yearbook`.
   */
  public static getModelName() {
    return "Yearbook";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Yearbook for dynamic purposes.
  **/
  public static factory(data: YearbookInterface): Yearbook{
    return new Yearbook(data);
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
      name: 'Yearbook',
      plural: 'Yearbooks',
      path: 'Yearbooks',
      properties: {
        "coverUrl": {
          name: 'coverUrl',
          type: 'string'
        },
        "price": {
          name: 'price',
          type: 'number'
        },
        "name": {
          name: 'name',
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
        epub: {
          name: 'epub',
          type: 'Epub',
          model: 'Epub'
        },
      }
    }
  }
}
