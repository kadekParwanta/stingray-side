import { AbstractControl } from '@angular/forms';
import { User } from '../shared/sdk/models';
import { UserApi } from '../shared/sdk/services';

export class EmailValidator {

  static createValidator(userApi: UserApi) {
    return (control: AbstractControl) => {
      let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let isValidFormat = EMAIL_REGEXP.test(control.value)
      if (isValidFormat) {
        return userApi.findByUsername(control.value).map(res => {
          return res['exists'] ? res : null;
        });
      } else {
        return Promise.resolve({"ValidFormat":false});
      }
      
    };
  }

}