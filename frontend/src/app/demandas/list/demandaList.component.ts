import { Component, OnInit, AfterViewInit } from '@angular/core';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandaService } from '../services/demanda.service';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';

declare const $: any;
declare interface DataTable {

  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-demanda-list',
  templateUrl: './demandaList.component.html',
  providers: [DemandaService]
})

export class DemandaListComponent implements OnInit, AfterViewInit {

  public dataTable: DataTable;
  public arr: any[];
  public identity;
  public token;
  public url;
  public persona;
  constructor(
    private _demandaService: DemandaService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.identity = this._demandaService.getIdentity();
    this.token = this._demandaService.getToken();
    this.url = GLOBAL.url;
  }

  onDelete(type, type2) {
    let token = localStorage.getItem('token');
    var identityaa = JSON.parse(localStorage.getItem("identity"));
    var a = identityaa.idUsuario.toString();
    const table = $('#datatables').DataTable();
    console.log(table);
    
    this._demandaService.deleteDemanda(token, type, a, type2).subscribe(
      response => {
        if (!response) {
          alert('Error en el servidor');
        }
        $.notify({
          icon: 'success',
          message: '¡La Demanda se ha Eliminado correctamente!',
          
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

    this._demandaService.getDemandas(token).subscribe(
      response => {

        if (response) {
          this.dataTable = {
            headerRow: ['N°', 'RADICADO', 'CLIENTE', 'ABOGADO', 'TIPO', 'ESPECIALIDAD','JUZGADO ORIGEN', 'BOTONES'],
            footerRow: ['N°', 'RADICADO', 'CLIENTE', 'ABOGADO', 'TIPO', 'ESPECIALIDAD','JUZGADO ORIGEN', 'BOTONES'],

            dataRows: []

          }

          for (let i = 0; i < Object.keys(response).length; i++) {
            const suma = i + 1;
            this.dataTable.dataRows.push(
              [suma, response[i].radicado_DEMANDA,response[i].id_Cliente_DEMANDA, response[i].id_Abogado_DEMANDA, response[i].tipo_DEMANDA, response[i].especialida_DEMANDA,response[i].juzgado_Origen_DEMANDA, '/demanda/a8eb56ac895796852576a2294df407e94fe0eb34a2ff5774e3f66a46119b7ba4ab2329c6630a8623ac862b2ce48e8adf151fb4278f24a820651cb937b7f8733f/' + response[i].idDemandas , response[i].idDemandas , '/demanda/5216aab0d87c9b0c204df7fbacc093ce9bce5e110e94311c14ee1fa9cc08badd94d661af3d1b8c4f37b7606353c3332e6dedc5a1577cef4b58e8f771d87d3f05/' + response[i].idDemandas]
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