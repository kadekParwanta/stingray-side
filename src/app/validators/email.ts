import { FormControl } from '@angular/forms';
import { User } from '../shared/sdk/models';
import { UserApi } from '../shared/sdk/services';

export class EmailValidator {

    constructor(public userApi: UserApi) { }

    static checkEmail(control: FormControl): any {  

        return new Promise(resolve => {

            //Fake a slow response from server
            setTimeout(() => {
                if (control.value.toLowerCase() === "admin@admin.com") {

                    resolve({
                        "EmailExists": true
                    });

                } else {
                    resolve(null);
                }
            }, 2000);

        });
    }

}