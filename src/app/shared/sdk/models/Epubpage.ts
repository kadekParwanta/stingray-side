/* tslint:disable */

declare var Object: any;
export interface EpubpageInterface {
  "pageNo": string;
  "title"?: string;
  "data": string;
  "author"?: string;
  "excludeFromToc"?: string;
  "beforeToc"?: string;
  "filename"?: string;
  "id"?: any;
  "epubId"?: any;
}

export class Epubpage implements EpubpageInterface {
  "pageNo": string;
  "title": string;
  "data": string;
  "author": string;
  "excludeFromToc": string;
  "beforeToc": string;
  "filename": string;
  "id": any;
  "epubId": any;
  constructor(data?: EpubpageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Epubpage`.
   */
  public static getModelName() {
    return "Epubpage";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Epubpage for dynamic purposes.
  **/
  public static factory(data: EpubpageInterface): Epubpage{
    return new Epubpage(data);
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
      name: 'Epubpage',
      plural: 'Epubpages',
      path: 'Epubpages',
      properties: {
        "pageNo": {
          name: 'pageNo',
          type: 'string'
        },
        "title": {
          name: 'title',
          type: 'string'
        },
        "data": {
          name: 'data',
          type: 'string'
        },
        "author": {
          name: 'author',
          type: 'string'
        },
        "excludeFromToc": {
          name: 'excludeFromToc',
          type: 'string'
        },
        "beforeToc": {
          name: 'beforeToc',
          type: 'string'
        },
        "filename": {
          name: 'filename',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "epubId": {
          name: 'epubId',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
