/* tslint:disable */

declare var Object: any;
export interface MediaInterface {
  url: string;
  name?: string;
  type?: string;
  format?: string;
  isProfilePicture?: string;
  dateCreated?: Date;
  userId?: any;
  container?: string;
  id?: any;
  pictureId?: any;
  personId?: any;
  classId?: any;
  generationId?: any;
  schoolId?: any;
}

export class Media implements MediaInterface {
  url: string;
  name: string;
  type: string;
  format: string;
  isProfilePicture: string;
  dateCreated: Date;
  userId: any;
  container: string;
  id: any;
  pictureId: any;
  personId: any;
  classId: any;
  generationId: any;
  schoolId: any;
  constructor(data?: MediaInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Media`.
   */
  public static getModelName() {
    return "Media";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Media for dynamic purposes.
  **/
  public static factory(data: MediaInterface): Media{
    return new Media(data);
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
      name: 'Media',
      plural: 'Media',
      properties: {
        url: {
          name: 'url',
          type: 'string'
        },
        name: {
          name: 'name',
          type: 'string'
        },
        type: {
          name: 'type',
          type: 'string'
        },
        format: {
          name: 'format',
          type: 'string'
        },
        isProfilePicture: {
          name: 'isProfilePicture',
          type: 'string'
        },
        dateCreated: {
          name: 'dateCreated',
          type: 'Date'
        },
        userId: {
          name: 'userId',
          type: 'any'
        },
        container: {
          name: 'container',
          type: 'string'
        },
        id: {
          name: 'id',
          type: 'any'
        },
        pictureId: {
          name: 'pictureId',
          type: 'any'
        },
        personId: {
          name: 'personId',
          type: 'any'
        },
        classId: {
          name: 'classId',
          type: 'any'
        },
        generationId: {
          name: 'generationId',
          type: 'any'
        },
        schoolId: {
          name: 'schoolId',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
