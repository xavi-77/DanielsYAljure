import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../../services/global';
import { Verifica } from '../../models/verificacion';
import { Abogado } from '../../models/abogado';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var $: any;
const controller = {};

@Injectable()
export class AbogadoService {
    public url: string;
	public token;
	public identity;

	constructor(private _http: HttpClient, private _router: Router) {
		this.url = GLOBAL.url;
		this.identity = localStorage.getItem('identity');

	}

    getAbogados(token, idAbogados  = null) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		if (idAbogados  == null) {
			return this._http.get(this.url + 'a6dc05b6e22ca47cd707fe84b4a49250fec4f66255620e914e051c4c9752d752', { headers: headers }).map(res => res);

		} else {
			return this._http.get(this.url + '6727fec27a806d61c541077d61b4e7405e2804edd514f5dc6a8f7647ee92f7a0/' + idAbogados , { headers: headers }).map(res => res);
		}

	}


    getAbogadoId(token, id:string) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this._http.get(this.url + '6727fec27a806d61c541077d61b4e7405e2804edd514f5dc6a8f7647ee92f7a0/' + id, { headers: headers })
			.map(res => res);
	}


    addAbogado(token, abogado: Abogado) {
		let params = JSON.stringify(abogado);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		if (abogado.nombres_ABOGADO.length == 0 || abogado.p_Apellido_ABOGADO.length == 0 || abogado.numero_Documento_ABOGADO.length == 0 || abogado.numero_Documento_Profesional_ABOGADO.length == 0) {
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
				message: 'Abogado Registrado Exitosamente!'

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

			this._router.navigateByUrl('persona/a880d76bedafc66b55868a3b4e9e661d14012154db0314cad1bb0988e516707abcdbcade36b5b26966da2696b3c3a0571e28ff2a1a8ff83b49dc26ce3d23bcda');
			return this._http.post(this.url + '2dae17ad02d19386271241936d7e84aaec813ffe2efe843248912cb520f5d4c9', params, { headers: headers }).map(res => res);
		}


	}

    editAbogado(token, id: string, abogado: Abogado) {
		let params = JSON.stringify(abogado);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		return this._http.put(this.url + '85f9b4ae4ab1f3fb5efa2a2ac0d78b8753abca35c75a0dafafcd4957ca32e3cc/' + id, params, { headers: headers }).map(res => res);
	}

    deleteAbogado(token, id: string, idus:string, codigo:string) {
		let datica ={
			iduser: idus,
			codigo: codigo
		}
		let params = JSON.stringify(datica);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this._http.post(this.url + '9484af3ae9163c88365aac3d19dbf410d49770abf88a466c0d72f5c72435d2f3/' + id, params, { headers: headers }).map(res => res);
	}

    listAbogado(token){
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this._http.get(this.url + 'a6dc05b6e22ca47cd707fe84b4a49250fec4f66255620e914e051c4c9752d752', { headers: headers })
			.map(res => res);

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
}