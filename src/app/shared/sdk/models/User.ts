/* tslint:disable */
import {
  Media,
  Message,
  Room
} from '../index';

declare var Object: any;
export interface UserInterface {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  phoneNumber?: string;
  address?: string;
  profilePicture?: string;
  roleName?: Array<string>;
  realm?: string;
  username?: string;
  password: string;
  challenges?: any;
  email: string;
  emailVerified?: boolean;
  verificationToken?: string;
  status?: string;
  created?: Date;
  lastUpdated?: Date;
  id?: any;
  creatorId?: any;
  accessTokens?: any[];
  Role?: any[];
  roleMapping?: any[];
  creator?: User;
  media?: Media;
  messages?: Message[];
  rooms?: Room[];
}

export class User implements UserInterface {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  address: string;
  profilePicture: string;
  roleName: Array<string>;
  realm: string;
  username: string;
  password: string;
  challenges: any;
  email: string;
  emailVerified: boolean;
  verificationToken: string;
  status: string;
  created: Date;
  lastUpdated: Date;
  id: any;
  creatorId: any;
  accessTokens: any[];
  Role: any[];
  roleMapping: any[];
  creator: User;
  media: Media;
  messages: Message[];
  rooms: Room[];
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
      properties: {
        firstName: {
          name: 'firstName',
          type: 'string'
        },
        lastName: {
          name: 'lastName',
          type: 'string'
        },
        dateOfBirth: {
          name: 'dateOfBirth',
          type: 'Date'
        },
        phoneNumber: {
          name: 'phoneNumber',
          type: 'string'
        },
        address: {
          name: 'address',
          type: 'string'
        },
        profilePicture: {
          name: 'profilePicture',
          type: 'string'
        },
        roleName: {
          name: 'roleName',
          type: 'Array&lt;string&gt;'
        },
        realm: {
          name: 'realm',
          type: 'string'
        },
        username: {
          name: 'username',
          type: 'string'
        },
        password: {
          name: 'password',
          type: 'string'
        },
        credentials: {
          name: 'credentials',
          type: 'any'
        },
        challenges: {
          name: 'challenges',
          type: 'any'
        },
        email: {
          name: 'email',
          type: 'string'
        },
        emailVerified: {
          name: 'emailVerified',
          type: 'boolean'
        },
        verificationToken: {
          name: 'verificationToken',
          type: 'string'
        },
        status: {
          name: 'status',
          type: 'string'
        },
        created: {
          name: 'created',
          type: 'Date'
        },
        lastUpdated: {
          name: 'lastUpdated',
          type: 'Date'
        },
        id: {
          name: 'id',
          type: 'any'
        },
        creatorId: {
          name: 'creatorId',
          type: 'any'
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
      }
    }
  }
}
