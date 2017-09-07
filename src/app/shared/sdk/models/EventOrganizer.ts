/* tslint:disable */
import {
  Media
} from '../index';

declare var Object: any;
export interface EventOrganizerInterface {
  "location"?: string;
  "topic"?: string;
  "artists"?: Array<any>;
  "name"?: string;
  "description"?: string;
  "createdDate"?: Date;
  "finishDate"?: Date;
  "id"?: any;
  photos?: Media[];
}

export class EventOrganizer implements EventOrganizerInterface {
  "location": string;
  "topic": string;
  "artists": Array<any>;
  "name": string;
  "description": string;
  "createdDate": Date;
  "finishDate": Date;
  "id": any;
  photos: Media[];
  constructor(data?: EventOrganizerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EventOrganizer`.
   */
  public static getModelName() {
    return "EventOrganizer";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EventOrganizer for dynamic purposes.
  **/
  public static factory(data: EventOrganizerInterface): EventOrganizer{
    return new EventOrganizer(data);
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
      name: 'EventOrganizer',
      plural: 'EventOrganizers',
      path: 'EventOrganizers',
      properties: {
        "location": {
          name: 'location',
          type: 'string'
        },
        "topic": {
          name: 'topic',
          type: 'string'
        },
        "artists": {
          name: 'artists',
          type: 'Array&lt;any&gt;'
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
