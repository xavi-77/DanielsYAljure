import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../../services/global';
import { Verifica } from '../../models/verificacion';
import { Demanda } from '../../models/demanda';
import { Router, ActivatedRoute, Params } from '@angular/router';


declare var $: any;
const controller = {};

@Injectable()
export class DemandaService {
	public url: string;
	public token;
	public identity;

	constructor(private _http: HttpClient, private _router: Router) {
		this.url = GLOBAL.url;
		this.identity = localStorage.getItem('identity');

	}

	getDemandas(token, idDemandas  = null) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		if (idDemandas  == null) {
			return this._http.get(this.url + '4658f0073a07acb51f9f155f77916b078b8246a02d54c756f2f27adef51d150e', { headers: headers }).map(res => res);

		} else {
			return this._http.get(this.url + '6d16360687030f7b11a3d78f0c6920039bccfb23370a5bbb0388abca08a5e4af/' + idDemandas, { headers: headers }).map(res => res);
		}

	}

	getDemandaId(token, id:string) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this._http.get(this.url + '6d16360687030f7b11a3d78f0c6920039bccfb23370a5bbb0388abca08a5e4af/' + id, { headers: headers })
			.map(res => res);
	}

	addDemanda(token, demanda: Demanda) {
		let params = JSON.stringify(demanda);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		if (demanda.radicado_DEMANDA == '' ||demanda.radicado_DEMANDA == ' ' || demanda.juzgado_Origen_DEMANDA == '' || demanda.juzgado_Origen_DEMANDA == ' ' || demanda.id_Abogado_DEMANDA == '' || demanda.id_Abogado_DEMANDA == ' ' || demanda.id_Cliente_DEMANDA == '' || demanda.id_Cliente_DEMANDA == ' ') {
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
				message: '¡ Demanda Registrada Exitosamente!'

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

			//this._router.navigateByUrl('bovino/list');
			return this._http.post(this.url + 'e20f8f581747bb25fa5df1667edd0dc47fb7dfbb28263556846cbea1d13a6fed', params, { headers: headers }).map(res => res);
		}


	}

	editDemanda(token, id: string, demanda: Demanda) {
		let params = JSON.stringify(demanda);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		return this._http.put(this.url + 'eb6ba149e636dade12e394db69c412a6993749a7fd97cf2b5c15d2a4717e6183/' + id, params, { headers: headers }).map(res => res);
	}

	deleteDemanda(token, id: string, idus:string, codigo:string) {
		let datica ={
			iduser: idus,
			codigo: codigo
		}
		let params = JSON.stringify(datica);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this._http.post(this.url + 'b5bc3c9a03d23fdefa31add286c1650a340daf0845f4e6c9b0089f35440fd48b/' + id, params, { headers: headers }).map(res => res);
	}

	listDemandaRadicado(token){
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this._http.get(this.url + 'f1c43b4852ecae7152c25b3bfc1d44d9af045f148415f6f79ca3f4e8f02d2231', { headers: headers })
			.map(res => res);

	}

	listDemandaporId(token, id: string){
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this._http.get(this.url + '6d16360687030f7b11a3d78f0c6920039bccfb23370a5bbb0388abca08a5e4af' + id, { headers: headers }).map(res => res);

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

	getDemandasPersona(token, idDemandas  = null) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		if (idDemandas  == null) {
			return this._http.get(this.url + 'f2982ab308781e9585da1c2e792c162b1d754bb5ecbcc04a3a1fc56170637a05', { headers: headers }).map(res => res);

		} else {
			return this._http.get(this.url + '122f5594bf76ce04a28ca8b7f61666fbcbe0a33b4032684988b6726909ed32d9/' + idDemandas, { headers: headers }).map(res => res);
		}

	}
}