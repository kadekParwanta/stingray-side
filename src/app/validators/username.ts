import { FormControl } from '@angular/forms';
import { User } from '../shared/sdk/models';
import { UserApi } from '../shared/sdk/services';

export class UsernameValidator {

    constructor(public userApi: UserApi) { }

    static checkUsername(control: FormControl): any {  

        return new Promise(resolve => {

            //Fake a slow response from server
            setTimeout(() => {
                if (control.value.toLowerCase() === "admin") {

                    resolve({
                        "username taken": true
                    });

                } else {
                    resolve(null);
                }
            }, 2000);

        });
    }

}