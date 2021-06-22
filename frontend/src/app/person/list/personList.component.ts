import { Component, OnInit, AfterViewInit } from '@angular/core';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from '../services/person.services';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';

declare const $: any;
declare interface DataTable {

  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-bovino-list',
  templateUrl: './personList.component.html',
  providers: [PersonaService]
})

export class PersonListComponent implements OnInit, AfterViewInit {

  public dataTable: DataTable;
  public arr: any[];
  public identity;
  public token;
  public url;
  public persona;
  constructor(
    private _personaService: PersonaService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.identity = this._personaService.getIdentity();
    this.token = this._personaService.getToken();
    this.url = GLOBAL.url;
  }

  onDelete(type, type2) {
    let token = localStorage.getItem('token');
    var identityaa = JSON.parse(localStorage.getItem("identity"));
    var a = identityaa.idUsuario.toString();
    const table = $('#datatables').DataTable();
    console.log(table);
    
    this._personaService.deletePersona(token, type, a, type2).subscribe(
      response => {
        if (!response) {
          alert('Error en el servidor');
        }
        $.notify({
          icon: 'success',
          message: '¡La persona se ha Eliminado correctamente!',
          
        }, {
          type: 'success',
          timer: 500,
          placement: {
            from: 'top',
            align: 'center'
          },
          template: '<div tabindex="-2"  data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">check_circle</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        },
          swal.fire({
            icon: 'success',
            text: 'La persona ha sido eliminada correctamente.',
            html: ' <strong>' +
              'La persona ha sido eliminada correctamente.' +
              '</strong>',
              

            customClass: {
              confirmButton: 'btn btn-loginp'
              

            },
            buttonsStyling: false


          })
          

        );

      },
      error => {
        $.notify({
          icon: 'danger',
          message: '¡Hubo Un error Consulte al Administrador del sistema!'

        }, {
          type: 'danger',
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
        swal.fire({

          icon: 'error',
          text: 'Ingrese su codigo de verificación asignado.',
          html: ' <strong>' +
            'Error! Codigo de Verificacion Inconrrecto...!' +
            '</strong>',

          customClass: {
            confirmButton: 'btn btn-loginp',
          },
          buttonsStyling: false

        })

      }

    );
  }
  ngOnInit() {

    let token = localStorage.getItem('token');

    this._personaService.getPersonas(token).subscribe(
      response => {

        if (response) {
          this.dataTable = {
            headerRow: ['N°', 'NOMBRE', 'APELLIDO', 'DOCUMENTO', 'TIPO DE PERSONA', 'BOTONES'],
            footerRow: ['N°', 'NOMBRE', 'APELLIDO', 'DOCUMENTO', 'TIPO DE PERSONA', 'BOTONES'],

            dataRows: []

          }

          for (let i = 0; i < Object.keys(response).length; i++) {
            const suma = i + 1;
            this.dataTable.dataRows.push(
              [suma, response[i].nombres_PERSONA+' '+ response[i].s_Nombres_PERSONA, response[i].p_Apellido_PERSONA + ' ' + response[i].s_Apellido_PERSONA, response[i].tipo_Documento_PERSONA + ' ' + response[i].num_Documento_PERSONA, response[i].tipo_PERSONA, '/persona/e2f4d6f5b31e7a688b3e00183576bffe4c1a1a353ebfd04b937bc3cb1a86bcb1977e7c4cb858dc5677589d88603f23d2a6501d22a316f246b259f06ce36e8427/' + response[i].idPersonas, response[i].idPersonas, '/persona/3032dc27365b7d4e6b55cdad543af764e6e57e533484a7469b93c51ef435fa2a986b126c20bce17f19129187c502c8c5e5dc6c4f78dd7180490bc63ae44c8959/' + response[i].idPersonas]
              )
          }

        } else {
          console.log("No Hay Nada!!!")
        }
      }

    )
  };

  showSwal(id) {
    swal.fire({
      title: 'Usted esta seguro de eliminar la persona?',
      html: '<div class="form-group">' +
        '<input id="input-field"  placeholder="CODIGO DE SEGURIDAD" type="password" class="form-control" />' +
        '</div>',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-loginp',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false
    }).then((result) => {

      let p2 = $('#input-field').val();

      if (result.isConfirmed == true) {
        if (p2 == '' || p2 == ' ') {
          swal.fire({
            icon: 'error',
            text: 'Ingrese su codigo de verificación asignado.',
            html: ' <strong>' +
              'Ingrese su codigo de verificación asignado.' +
              '</strong>',

            customClass: {
              confirmButton: 'btn btn-loginp',
            },
            buttonsStyling: false

          })
        } else if (result.isConfirmed == true && result.value == true) {
          this.onDelete(id, p2);

        }

      } else if (result.isConfirmed == false) {
        swal.fire({
          icon: 'error',
          text: 'Acción Cancelada...!',
          html: ' <strong>' +
            'Accion Cancelada...! ' +
            '</strong>',

          customClass: {
            confirmButton: 'btn btn-loginp',
          },
          buttonsStyling: false

        })


      }

    });
  }



  ngAfterViewInit() {

    $('#datatables').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "TODOS"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Buscar",
      }

    });


    const table = $('#datatables').DataTable();

    // Edit record
    table.on('click', '.edit', function (e) {
      let $tr = $(this).closest('tr');
      if ($($tr).hasClass('child')) {
        $tr = $tr.prev('.parent');
      }
      var data = table.row($tr).data();
    });

    // Delete a record
    table.on('click', '.remove', function (e) {
      const $tr = $(this).closest('tr');
      let idEnt = table.row($tr).data();
      table.row($tr).remove().draw();
      e.preventDefault();
    });



    //Like record
    table.on('click', '.like', function (e) {
      /* alert('You clicked on Like button');
        e.preventDefault();*/
    });

    $('.card .material-datatables label').addClass('form-group');
  }
}
