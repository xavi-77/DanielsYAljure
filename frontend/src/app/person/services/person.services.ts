import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../../services/global';
import { Verifica } from '../../models/verificacion';
import { Persona } from '../../models/persona';
import { Router, ActivatedRoute, Params } from '@angular/router';


declare var $: any;
const controller = {};

@Injectable()
export class PersonaService {
	public url: string;
	public token;
	public identity;

	constructor(private _http: HttpClient, private _router: Router) {
		this.url = GLOBAL.url;
		this.identity = localStorage.getItem('identity');

	}

	getPersonas(token, idPersonas = null) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		if (idPersonas == null) {
			return this._http.get(this.url + 'ff4f4ce4cf5bcc3c9613176748b9880e28524745808a88729cf93c732e6d7cd8', { headers: headers }).map(res => res);

		} else {
			return this._http.get(this.url + '6349b485fc8d94fe48f20190106cb8ef6d2e2db5f9631bfcd47f374cf0196c30/' + idPersonas, { headers: headers }).map(res => res);
		}

	}

	getPersonaId(token, id:string) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this._http.get(this.url + '6349b485fc8d94fe48f20190106cb8ef6d2e2db5f9631bfcd47f374cf0196c30/' + id, { headers: headers })
			.map(res => res);
	}

	addPersona(token, persona: Persona) {
		let params = JSON.stringify(persona);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		if (persona.nombres_PERSONA.length == 0 || persona.num_Documento_PERSONA.length == 0 || persona.p_Apellido_PERSONA.length == 0) {
			$.notify({
				icon: 'warning',
				message: '¡Rellene Todos los Campos De Forma Correcta!'

			}, {
				type: 'warning',
				timer: 3000,
				placement: {
					from: 'top',
					align: 'center'
				},
				template: '<div tabindex="-2"  data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
					'<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
					'<i class="material-icons" data-notify="icon">warning</i> ' +
					'<span data-notify="title">{1}</span> ' +
					'<span data-notify="message">{2}</span>' +
					'<div class="progress" data-notify="progressbar">' +
					'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
					'</div>' +
					'<a href="{3}" target="{4}" data-notify="url"></a>' +
					'</div>'
			});
		} else {
			$.notify({
				icon: 'success',
				message: '¡Persona Registrada Exitosamente!'

			}, {
				type: 'success',
				timer: 3000,
				placement: {
					from: 'top',
					align: 'center'
				},
				template: '<div tabindex="-2"  data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
					'<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
					'<i class="material-icons" data-notify="icon">warning</i> ' +
					'<span data-notify="title">{1}</span> ' +
					'<span data-notify="message">{2}</span>' +
					'<div class="progress" data-notify="progressbar">' +
					'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
					'</div>' +
					'<a href="{3}" target="{4}" data-notify="url"></a>' +
					'</div>'
			});

			this._router.navigateByUrl('bovino/list');
			return this._http.post(this.url + '1c666231894daf6f8fe18f1b1b5f2d82fa67b8f194ec73139ce51e09e786b126', params, { headers: headers }).map(res => res);
		}


	}

	editPersona(token, id: string, persona: Persona) {
		let params = JSON.stringify(persona);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		return this._http.put(this.url + '0cbbcf507cfc6b6c2db5a6babd0347dc723df6807bc56b8cf35df35ccd179faf/' + id, params, { headers: headers }).map(res => res);
	}

	deletePersona(token, id: string, idus:string, codigo:string) {
		let datica ={
			iduser: idus,
			codigo: codigo
		}
		let params = JSON.stringify(datica);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this._http.post(this.url + '670d1a11689c25d1e58eff7211d9ce1c943d2f0c28fbbb2175264c9f49ce3f3b/' + id, params, { headers: headers }).map(res => res);
	}

	listPersonaAbogado(token){
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this._http.get(this.url + '0df17a40bef7efc59a65773a7219db38fe2e3f0346a11fadb6641fafc2cdeefd', { headers: headers })
			.map(res => res);

	}

	listPersonaCliente(token){
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this._http.get(this.url + 'a8fea2a8eae2acb92d9b32f9f8f43a8e6bff78a52de0aef38f9f5798982259b8', { headers: headers }).map(res => res);

	}

	getIdentity() {
		let identity = JSON.parse(localStorage.getItem('identity'));

		if (identity != "undefined") {
			this.identity = identity;
		} else {
			this.identity = null;
		}

		return this.identity;
	}
	getIdentityiD() {
		let identity = JSON.parse(localStorage.getItem('identity'));

		if (identity != "undefined") {
			this.identity = identity;
		} else {
			this.identity = null;
		}

		return this.identity;
	}

	getToken() {
		let token = localStorage.getItem('token');

		if (token != "undefined") {
			this.token = token;
		} else {
			this.token = null;
		}

		return this.token;
	}


	listar = (req, res) => {
		req.getConnection((err, conn) => {
			conn.query('SELECT * FROM bovinos', (err, bovinoss) => {
				if (err) {
					res.json(err);
				}
				res.render('bovinoss', {
					data: bovinoss
				});
			});
		});
	};

}