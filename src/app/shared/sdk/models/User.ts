/* tslint:disable */
import {
  Media,
  Student,
  Message,
  Room,
  Order,
  Generation
} from '../index';

declare var Object: any;
export interface UserInterface {
  "firstName"?: string;
  "lastName"?: string;
  "dateOfBirth"?: Date;
  "phoneNumber"?: string;
  "address"?: string;
  "profilePicture"?: string;
  "roleName"?: Array<any>;
  "unverifiedSchools"?: Array<any>;
  "unverifiedGenerations"?: Array<any>;
  "unverifiedClasses"?: Array<any>;
  "unverifiedStudents"?: Array<any>;
  "realm"?: string;
  "username"?: string;
  "challenges"?: any;
  "email": string;
  "emailVerified"?: boolean;
  "status"?: string;
  "created"?: Date;
  "lastUpdated"?: Date;
  "id"?: any;
  "creatorId"?: any;
  "password"?: string;
  accessTokens?: any[];
  Role?: any[];
  roleMapping?: any[];
  creator?: User;
  media?: Media;
  students?: Student[];
  messages?: Message[];
  rooms?: Room[];
  orders?: Order[];
  yearbooks?: Generation[];
}

export class User implements UserInterface {
  "firstName": string;
  "lastName": string;
  "dateOfBirth": Date;
  "phoneNumber": string;
  "address": string;
  "profilePicture": string;
  "roleName": Array<any>;
  "unverifiedSchools": Array<any>;
  "unverifiedGenerations": Array<any>;
  "unverifiedClasses": Array<any>;
  "unverifiedStudents": Array<any>;
  "realm": string;
  "username": string;
  "challenges": any;
  "email": string;
  "emailVerified": boolean;
  "status": string;
  "created": Date;
  "lastUpdated": Date;
  "id": any;
  "creatorId": any;
  "password": string;
  accessTokens: any[];
  Role: any[];
  roleMapping: any[];
  creator: User;
  media: Media;
  students: Student[];
  messages: Message[];
  rooms: Room[];
  orders: Order[];
  yearbooks: Generation[];
  constructor(data?: UserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `User`.
   */
  public static getModelName() {
    return "User";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of User for dynamic purposes.
  **/
  public static factory(data: UserInterface): User{
    return new User(data);
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
      name: 'User',
      plural: 'Users',
      path: 'Users',
      properties: {
        "firstName": {
          name: 'firstName',
          type: 'string'
        },
        "lastName": {
          name: 'lastName',
          type: 'string'
        },
        "dateOfBirth": {
          name: 'dateOfBirth',
          type: 'Date'
        },
        "phoneNumber": {
          name: 'phoneNumber',
          type: 'string'
        },
        "address": {
          name: 'address',
          type: 'string'
        },
        "profilePicture": {
          name: 'profilePicture',
          type: 'string'
        },
        "roleName": {
          name: 'roleName',
          type: 'Array&lt;any&gt;'
        },
        "unverifiedSchools": {
          name: 'unverifiedSchools',
          type: 'Array&lt;any&gt;'
        },
        "unverifiedGenerations": {
          name: 'unverifiedGenerations',
          type: 'Array&lt;any&gt;'
        },
        "unverifiedClasses": {
          name: 'unverifiedClasses',
          type: 'Array&lt;any&gt;'
        },
        "unverifiedStudents": {
          name: 'unverifiedStudents',
          type: 'Array&lt;any&gt;'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "credentials": {
          name: 'credentials',
          type: 'any'
        },
        "challenges": {
          name: 'challenges',
          type: 'any'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "status": {
          name: 'status',
          type: 'string'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "lastUpdated": {
          name: 'lastUpdated',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "creatorId": {
          name: 'creatorId',
          type: 'any'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: ''
        },
        Role: {
          name: 'Role',
          type: 'any[]',
          model: ''
        },
        roleMapping: {
          name: 'roleMapping',
          type: 'any[]',
          model: ''
        },
        creator: {
          name: 'creator',
          type: 'User',
          model: 'User'
        },
        media: {
          name: 'media',
          type: 'Media',
          model: 'Media'
        },
        students: {
          name: 'students',
          type: 'Student[]',
          model: 'Student'
        },
        messages: {
          name: 'messages',
          type: 'Message[]',
          model: 'Message'
        },
        rooms: {
          name: 'rooms',
          type: 'Room[]',
          model: 'Room'
        },
        orders: {
          name: 'orders',
          type: 'Order[]',
          model: 'Order'
        },
        yearbooks: {
          name: 'yearbooks',
          type: 'Generation[]',
          model: 'Generation'
        },
      }
    }
  }
}
