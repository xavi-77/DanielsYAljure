import { Component, OnInit, AfterViewInit } from '@angular/core';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AbogadoService } from '../services/abogado.services';
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
  templateUrl: './abogadoList.component.html',
  providers: [AbogadoService]
})

export class AbogadoListComponent implements OnInit, AfterViewInit {

  public dataTable: DataTable;
  public arr: any[];
  public identity;
  public token;
  public url;
  public abogado;
  constructor(
    private _abogadoService: AbogadoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.identity = this._abogadoService.getIdentity();
    this.token = this._abogadoService.getToken();
    this.url = GLOBAL.url;
  }

  onDelete(type, type2) {
    let token = localStorage.getItem('token');
    var identityaa = JSON.parse(localStorage.getItem("identity"));
    var a = identityaa.idUsuario.toString();
    const table = $('#datatables').DataTable();
    console.log(table);
    
    this._abogadoService.deleteAbogado(token, type, a, type2).subscribe(
      response => {
        if (!response) {
          alert('Error en el servidor');
        }
        $.notify({
          icon: 'success',
          message: '¡El abogado se ha Eliminado correctamente!',
          
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
            text: 'El abogado ha sido eliminado correctamente.',
            html: ' <strong>' +
              'El abogado ha sido eliminado correctamente.' +
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

    this._abogadoService.getAbogados(token).subscribe(
      response => {

        if (response) {
          this.dataTable = {
            headerRow: ['N°', 'NOMBRE', 'APELLIDO', 'TARJETA PROFESIONAL', 'TIPO DE ABOGADO', 'BOTONES'],
            footerRow: ['N°', 'NOMBRE', 'APELLIDO', 'TARJETA PROFESIONAL', 'TIPO DE ABOGADO', 'BOTONES'],

            dataRows: []

          }

          for (let i = 0; i < Object.keys(response).length; i++) {
            const suma = i + 1;
            this.dataTable.dataRows.push(
              [suma, response[i].nombres_ABOGADO+' '+ response[i].s_Nombre_ABOGADO, response[i].p_Apellido_ABOGADO + ' ' + response[i].s_Apellido_ABOGADO, response[i].numero_Documento_Profesional_ABOGADO, response[i].tipo_ABOGADO, '/abogado/729bf16d94da54d1102b9aa7541658e573084c1f834519aeb20c7579ca8853fae36e6b003e2b120bd83e954d9cca29e8e1e8ed6b9b4cf3685c84d81a9fbe3445/' + response[i].idAbogados , response[i].idAbogados , '/abogado/040f59007b69d0448125ae52f015bae54aff71ce73671f3678a896c3dbf0ba0a40f17f18be4bb7712f253a08d6bff58c4afc7c003b5c6931faeabac95dbdd6a8/' + response[i].idAbogados]
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
      title: 'Usted esta seguro de eliminar el abogado?',
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
