import { Injectable } from "@angular/core";
import { UserServiceLogin } from "./service.login";


@Injectable()
export class AuthService {

    public token;
    
    constructor(private _userServiceLogin: UserServiceLogin) {
        //this.token = this._userServiceLogin.getToken();
     }

    isLoggedIn() {
        return !!localStorage.getItem('token');
    }
}