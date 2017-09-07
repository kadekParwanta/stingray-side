/* tslint:disable */

declare var Object: any;
export interface WebAppConfigInterface {
  "webName": string;
  "companyName": string;
  "initial": string;
  "webVersion": string;
  "disableSignUp": boolean;
  "disableResetPassword": boolean;
  "disableForgotPassword": boolean;
  "copyright": string;
  "formDefinition": any;
  "id"?: any;
}

export class WebAppConfig implements WebAppConfigInterface {
  "webName": string;
  "companyName": string;
  "initial": string;
  "webVersion": string;
  "disableSignUp": boolean;
  "disableResetPassword": boolean;
  "disableForgotPassword": boolean;
  "copyright": string;
  "formDefinition": any;
  "id": any;
  constructor(data?: WebAppConfigInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `WebAppConfig`.
   */
  public static getModelName() {
    return "WebAppConfig";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of WebAppConfig for dynamic purposes.
  **/
  public static factory(data: WebAppConfigInterface): WebAppConfig{
    return new WebAppConfig(data);
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
      name: 'WebAppConfig',
      plural: 'WebAppConfigs',
      path: 'WebAppConfigs',
      properties: {
        "webName": {
          name: 'webName',
          type: 'string'
        },
        "companyName": {
          name: 'companyName',
          type: 'string'
        },
        "initial": {
          name: 'initial',
          type: 'string'
        },
        "webVersion": {
          name: 'webVersion',
          type: 'string'
        },
        "disableSignUp": {
          name: 'disableSignUp',
          type: 'boolean'
        },
        "disableResetPassword": {
          name: 'disableResetPassword',
          type: 'boolean'
        },
        "disableForgotPassword": {
          name: 'disableForgotPassword',
          type: 'boolean'
        },
        "copyright": {
          name: 'copyright',
          type: 'string'
        },
        "formDefinition": {
          name: 'formDefinition',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
