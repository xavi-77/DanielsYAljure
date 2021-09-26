import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../../services/global';
import { Verifica } from '../../models/verificacion';
import { Demanda } from '../../models/demanda';
import { Anexo } from '../../models/anexo';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var $: any;
const controller = {};

@Injectable()
export class AnexoService {
    public url: string;
    public token;
    public identity;

    constructor(private _http: HttpClient, private _router: Router) {
        this.url = GLOBAL.url;
        this.identity = localStorage.getItem('identity');

    }

    getAnexos(token) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.get(this.url + '1f8d915e65e2235ff2e89ce19cd563a86f4614cb1db47b463b60e1b94ca5d2df', { headers: headers }).map(res => res);

    }

    getAnexoId(token, id: string) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this._http.get(this.url + '/' + id, { headers: headers })
			.map(res => res);
	}

    addAnexo(token, anexo: Anexo) {
		let params = JSON.stringify(anexo);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		if (anexo.tipo_Documento_ANEXO == '' || anexo.tipo_Documento_ANEXO == ' ' || anexo.concepto_ANEXO == '' || anexo.concepto_ANEXO == ' '|| anexo.nombre_Documento_ANEXO == '' || anexo.nombre_Documento_ANEXO == ' ') {
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
				message: '¡ Anexo Registrado Exitosamente!'

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
			return this._http.post(this.url + '4b3aeb1f73764dfc5e4d91de4ed8433d73a785debd00b3d166bf5976077cb588', params, { headers: headers }).map(res => res);
		}


	}

    editAnexo(token, id: string, anexo: Anexo) {
		let params = JSON.stringify(anexo);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		return this._http.put(this.url + 'da32fa05272a7da1fab18d2bacac84735e0e586501313e28e41f6a757c66f134/' + id, params, { headers: headers }).map(res => res);
	}

    deleteAnexo(token, id: string, idus: string, codigo: string) {
		let datica = {
			iduser: idus,
			codigo: codigo
		}
		let params = JSON.stringify(datica);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this._http.post(this.url + '7e8de9400b26cf8014d34bbf3bf19a8f65d008e1e180b566246550d37a832dbc/' + id, params, { headers: headers }).map(res => res);
	}

    listAnexoActivo(token) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this._http.get(this.url + '1f8d915e65e2235ff2e89ce19cd563a86f4614cb1db47b463b60e1b94ca5d2df', { headers: headers })
			.map(res => res);

	}

	listAnexoActivoID(token, id: string) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this._http.get(this.url + 'eb3bbc3c532c21d8e047994455d30cb06719a25e830995d171f43dde3431b1c3/'+ id, { headers: headers })
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