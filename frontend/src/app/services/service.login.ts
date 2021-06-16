import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UserServiceLogin {
	public identity;
	public token;
	public url: string;

	constructor(private http: HttpClient) {
		this.url = GLOBAL.url;
	}

	loginUp(user_to_login, gethash = null) {

		if (gethash != null) {
			user_to_login.gethash = gethash;
		}

		let json = JSON.stringify(user_to_login);
		let params = json;
		let headers = new HttpHeaders({
			'Content-Type': 'application/json'
		 });
		 let options = {
			headers: headers
		 }
        return this.http.post(this.url+'428821350e9691491f616b754cd8315fb86d797ab35d843479e732ef90665324', params, {headers: headers}).map(res => res );	

	}

	getIdentity() {
		let identity =localStorage.getItem('identity');

		if (identity != "undefined") {
			this.identity = identity;
		} else {
			this.identity = null;
		}

		return this.identity;
	}

	getToken() {
		let token = localStorage.getItem('token');

		if (token != null) {
			this.token = token;
		} else {
			this.token = null;
		}

		return this.token;
	}
}