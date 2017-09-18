/* tslint:disable */
import {
  Media
} from '../index';

declare var Object: any;
export interface PromotionInterface {
  "type"?: string;
  "htmlContent"?: string;
  "name"?: string;
  "description"?: string;
  "createdDate"?: Date;
  "finishDate"?: Date;
  "id"?: any;
  photos?: Media[];
}

export class Promotion implements PromotionInterface {
  "type": string;
  "htmlContent": string;
  "name": string;
  "description": string;
  "createdDate": Date;
  "finishDate": Date;
  "id": any;
  photos: Media[];
  constructor(data?: PromotionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Promotion`.
   */
  public static getModelName() {
    return "Promotion";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Promotion for dynamic purposes.
  **/
  public static factory(data: PromotionInterface): Promotion{
    return new Promotion(data);
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
      name: 'Promotion',
      plural: 'Promotions',
      path: 'Promotions',
      properties: {
        "type": {
          name: 'type',
          type: 'string'
        },
        "htmlContent": {
          name: 'htmlContent',
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
