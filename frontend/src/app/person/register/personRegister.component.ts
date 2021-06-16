import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Persona } from 'src/app/models/persona';
import { GLOBAL } from '../../services/global';
import { PersonaService } from '../services/person.services';
import { ActivatedRoute, Router, Params } from '@angular/router';


declare var $: any;


@Component({
  selector: 'app-personRegister-cmp',
  templateUrl: 'personRegister.component.html',
  providers: [PersonaService]
})

export class PersonRegisterComponent {
  public persona: Persona;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  personas: Persona[];

  constructor(

    private _personaService: PersonaService,
    private _route: ActivatedRoute,
    private _router: Router

  ) {

    this.identity = this._personaService.getIdentity();
    this.token = this._personaService.getToken();
    this.url = GLOBAL.url;
    this.persona = new Persona('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'ACTIVO', '', '', '', '');

  }

  ngOnInit() {
   
    let token = localStorage.getItem('token');
  }

  documentos = [
    { value: 'C.C.', viewValue: 'CEDULA CIUDADANIA' },
    { value: 'T.I.', viewValue: 'TARJETA DE IDENTIDAD' },
    { value: 'N.V.', viewValue: 'REGISTRO DE NACIDO VIVO' },
    { value: 'R.C.', viewValue: 'REGISTRO CIVIL' }

  ];

  pensionados = [
    { value: 'SI', viewValue: 'SI' },
    { value: 'NO', viewValue: 'NO' }
  ];

  tipopersonas = [
    { value: 'ABOGADO', viewValue: 'ABOGADO' },
    { value: 'CLIENTE', viewValue: 'CLIENTE' }
  ];


  onRegistrarPersona() {

    this._route.params.forEach((params: Params) => {
      this._personaService.addPersona(this.token, this.persona).subscribe(
        response => {
          if (!response) {
            this.alertMessage = 'Error en el servidor';
          } else {
            $.notify({
              icon: 'warning',
              message: '¡La persona se ha registrado correctamente!'

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
            this._router.navigateByUrl('/');

          }

        },
        error => {
          var errorMessage = <any>error;

          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            $.notify({
              icon: 'warning',
              message: body.message + ' No Se Pudo registrar la persona...!'
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
