import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Demanda } from 'src/app/models/demanda';
import { GLOBAL } from '../../services/global';
import { DemandaService } from '../services/demanda.service';
import { PersonaService } from '../../person/services/person.services';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { UploadService } from '../../services/upload.service';


@Component({
    selector: 'app-editardemanda-editar',
    templateUrl: 'demandaUpdate.component.html',
    providers: [PersonaService, DemandaService,UploadService]
})

export class DemandaUpdateComponent implements OnInit {
  public demanda: Demanda;
  public identity;
  public token;
  public abogados: any;
  public url: string;
  public alertMessage;
  demandas: Demanda[];
  clientes: any;
  public deman;

  constructor(

    private _demandaService: DemandaService,
    private _personaService: PersonaService,
    private _route: ActivatedRoute,
    private _router: Router, 
    private _uploadService: UploadService

  ) {

    this.identity = this._demandaService.getIdentity();
    this.token = this._demandaService.getToken();
    this.url = GLOBAL.url;
    this.demanda = new Demanda('','','', '', '', '', '', '', '', '', '', '', 'ACTIVO');

  }

    ngOnInit() {
        this.getPersonaNow();
        let token = localStorage.getItem('token');

        
    }

    getPersonaNow() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._demandaService.getDemandaId(this.token, id).subscribe(
                response => {
                    if (!response) {
                        this._router.navigate(['/demanda/f0b648fa39712ba2bba9b2ff0ebb6044deaafbf29e6b75b89dee96ab05522cdf626ff2ad5e07aba65978faf9c241a58a3536b10a512366407ce80a3cc7db3fe5']);
                    } else {
                        this.deman = response;
                    }
                },
                error => {
                    var errorMessage = <any>error;
                    if (errorMessage != null) {
                        var body = JSON.parse(error._body);
                        console.log(error);
                    }
                }
            );
        });
    }

    onEditarDemanda() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._demandaService.editDemanda(this.token, id, this.demanda).subscribe(
                response => {
                    if (!response) {
                        console.log('Error en el servidor');
                    } else {
                        console.log('¡La demanda se ha actualizado correctamente!');
                        //this.alertMessage = '¡El album se ha actualizado correctamente!';
                        if (!this.filesToUpload) {
                            // Redirigir
                            this._router.navigate(['/persona/a880d76bedafc66b55868a3b4e9e661d14012154db0314cad1bb0988e516707abcdbcade36b5b26966da2696b3c3a0571e28ff2a1a8ff83b49dc26ce3d23bcda']);

                        } else {
                            // Subir la imagen del alblum
                            this._uploadService.makeFileRequest(this.url +'693dd2f438b22e2c2cdfd356bd04ce3111acd176f77f2dda964f1bba0d532260/'+ id, [], this.filesToUpload, this.token, 'image')
                                .then(
                                    (result) => {
                                        this._router.navigate(['/persona/a880d76bedafc66b55868a3b4e9e661d14012154db0314cad1bb0988e516707abcdbcade36b5b26966da2696b3c3a0571e28ff2a1a8ff83b49dc26ce3d23bcda']);
                                    },
                                    (error) => {
                                        console.log(error);
                                    }
                                );
                        }

                    }

                },
                error => {
                    var errorMessage = <any>error;

                    if (errorMessage != null) {
                        var body = JSON.parse(error._body);
                        // this.alertMessage = body.message;
                    }
                }
            );
        });
    }

    public filesToUpload: Array<File>;

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        var token = this.token;

        return new Promise(function (resolve, reject) {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for (var i = 0; i < files.length; i++) {
                formData.append('image', files[i], files[i].name);
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }

                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });

    }

}