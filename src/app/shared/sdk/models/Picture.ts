/* tslint:disable */
import {
  Media
} from '../index';

declare var Object: any;
export interface PictureInterface {
  id?: any;
  media?: Array<Media>;
}

export class Picture implements PictureInterface {
  id: any;
  media: Array<Media>;
  constructor(data?: PictureInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Picture`.
   */
  public static getModelName() {
    return "Picture";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Picture for dynamic purposes.
  **/
  public static factory(data: PictureInterface): Picture{
    return new Picture(data);
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
      name: 'Picture',
      plural: 'Pictures',
      properties: {
        id: {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        media: {
          name: 'media',
          type: 'Array<Media>',
          model: 'Media'
        },
      }
    }
  }
}
