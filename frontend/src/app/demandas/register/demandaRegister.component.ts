import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Demanda } from 'src/app/models/demanda';
import { GLOBAL } from '../../services/global';
import { DemandaService } from '../services/demanda.service';
import { PersonaService } from '../../person/services/person.services';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Persona } from 'src/app/models/persona';


declare var $: any;


@Component({
  selector: 'app-demandaRegister-cmp',
  templateUrl: 'demandaRegister.component.html',
  providers: [DemandaService, PersonaService]
})

export class DemandaRegisterComponent {
  public demanda: Demanda;
  public identity;
  public token;
  public abogados: any;
  public url: string;
  public alertMessage;
  demandas: Demanda[];
  clientes: any;
  public person: Persona;
  abog: Array<Object>;
  clienta: Array<Object>;


  constructor(

    private _demandaService: DemandaService,
    private _personaService: PersonaService,
    private _route: ActivatedRoute,
    private _router: Router

  ) {

    this.identity = this._demandaService.getIdentity();
    this.token = this._demandaService.getToken();
    this.url = GLOBAL.url;
    this.demanda = new Demanda('', '', '', '', '', '', '', '', '', '', '', '', 'ACTIVO');
    this.person = new Persona('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

  }

  ngOnInit() {

    let token = localStorage.getItem('token');
  }

  onRegistrarDemanda() {

    this._route.params.forEach((params: Params) => {
      this._demandaService.addDemanda(this.token, this.demanda).subscribe(
        response => {
          if (!response) {
            this.alertMessage = 'Error en el servidor';
          } else {
            $.notify({
              icon: 'warning',
              message: '¡La demanda se ha registrado correctamente!'

            }, {
              type: 'warning',
              timer: 500,
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
            this._router.navigate(['/demanda/70098a45fdb68758e402118323a910d8e1541ab04c1bccf1252995527194d12633303219c0615a280d3cf4a5e82bdbba21f8e35373de5426910986b96beb399f']);

          }

        },
        error => {
          var errorMessage = <any>error;

          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            $.notify({
              icon: 'warning',
              message: body.message + ' No Se Pudo registrar la demanda...!'
            }, {
              type: 'warning',
              timer: 3000,
              placement: {
                from: 'top',
                align: 'center'
              },
              template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
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
          }
        }
      );


    });
  }

}
