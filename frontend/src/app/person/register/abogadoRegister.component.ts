import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Abogado } from '../../models/abogado';
import { GLOBAL } from '../../services/global';
import { AbogadoService } from '../services/abogado.services';
import { ActivatedRoute, Router, Params } from '@angular/router';


declare var $: any;


@Component({
  selector: 'app-abogadoRegister-cmp',
  templateUrl: 'abogadoRegister.component.html',
  providers: [AbogadoService]
})

export class AbogadoRegisterComponent {
  public abogado: Abogado;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  abogados: Abogado[];

  constructor(

    private _abogadoService: AbogadoService,
    private _route: ActivatedRoute,
    private _router: Router

  ) {

    this.identity = this._abogadoService.getIdentity();
    this.token = this._abogadoService.getToken();
    this.url = GLOBAL.url;
    this.abogado = new Abogado('','','', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

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

  tipoabogados = [
    { value: 'ABOGADO', viewValue: 'ABOGADO' },
    { value: 'ADMINISTRADOR', viewValue: 'ADMINISTRADOR' }
  ];


  onRegistrarPersona() {

    this._route.params.forEach((params: Params) => {
      this._abogadoService.addAbogado(this.token, this.abogado).subscribe(
        response => {
          if (!response) {
            this.alertMessage = 'Error en el servidor';
          } else {
            $.notify({
              icon: 'warning',
              message: '¡Abogado registrado correctamente!'

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
            this._router.navigate(['/persona/a880d76bedafc66b55868a3b4e9e661d14012154db0314cad1bb0988e516707abcdbcade36b5b26966da2696b3c3a0571e28ff2a1a8ff83b49dc26ce3d23bcda']);

          }

        },
        error => {
          var errorMessage = <any>error;

          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            $.notify({
              icon: 'warning',
              message: body.message + ' No Se Pudo registrar el abogado...!'
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
