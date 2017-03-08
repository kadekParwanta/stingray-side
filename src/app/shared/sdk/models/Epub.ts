/* tslint:disable */
import {
  Epubpage
} from '../index';

declare var Object: any;
export interface EpubInterface {
  author?: string;
  publisher?: string;
  id?: any;
  yearbookId?: any;
  epubpages?: Epubpage[];
}

export class Epub implements EpubInterface {
  author: string;
  publisher: string;
  id: any;
  yearbookId: any;
  epubpages: Epubpage[];
  constructor(data?: EpubInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Epub`.
   */
  public static getModelName() {
    return "Epub";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Epub for dynamic purposes.
  **/
  public static factory(data: EpubInterface): Epub{
    return new Epub(data);
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
      name: 'Epub',
      plural: 'Epubs',
      properties: {
        author: {
          name: 'author',
          type: 'string'
        },
        publisher: {
          name: 'publisher',
          type: 'string'
        },
        id: {
          name: 'id',
          type: 'any'
        },
        yearbookId: {
          name: 'yearbookId',
          type: 'any'
        },
      },
      relations: {
        epubpages: {
          name: 'epubpages',
          type: 'Epubpage[]',
          model: 'Epubpage'
        },
      }
    }
  }
}
