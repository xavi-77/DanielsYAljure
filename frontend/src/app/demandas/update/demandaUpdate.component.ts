import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Demanda } from '../../models/demanda';
import { Persona } from '../../models/persona';
import { GLOBAL } from '../../services/global';
import { DemandaService } from '../services/demanda.service';
import { PersonaService } from '../../person/services/person.services';
import { AbogadoService } from '../../person/services/abogado.services';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { UploadService } from '../../services/upload.service';


@Component({
    selector: 'app-editardemanda-editar',
    templateUrl: 'demandaUpdate.component.html',
    providers: [PersonaService, DemandaService, AbogadoService, UploadService]
})

export class DemandaUpdateComponent implements OnInit {
  public demandasa: Demanda;
  public identity;
  public token;
  abogados: any;
  public url: string;
  public alertMessage;
  demandas: Demanda[];
  clientes: any;
  public demanda;
  public persona;
  personas: any;
  razas: any;

  constructor(

    private _demandaService: DemandaService,
    private _personaService: PersonaService,
    private _abogadoService: AbogadoService,
    private _route: ActivatedRoute,
    private _router: Router, 
    private _uploadService: UploadService

  ) {

    this.identity = this._demandaService.getIdentity();
    this.token = this._demandaService.getToken();
    this.url = GLOBAL.url;
    this.demanda = new Demanda('','','', '', '', '', '', '', '', '', '', '', 'ACTIVO');
    this.persona = new Persona('','','', '', '', '', '', '','', '', '','', '', '', '','', '', '','','', '', '', '');

  }

    ngOnInit() {
        this.getAbogadoNow();
        let token = localStorage.getItem('token');
        this._personaService.getPersonas(token).subscribe(
            pers => {
                this.clientes = pers;
            }

        );    
        
        this._abogadoService.getAbogados(token).subscribe(
            abog => {
                this.abogados = abog;
            }

        );    
        
    }

    
    getAbogadoNow() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._demandaService.getDemandasActivasID(this.token, id).subscribe(
                response => {
                    if (!response) {
                        this._router.navigate(['/demanda/70098a45fdb68758e402118323a910d8e1541ab04c1bccf1252995527194d12633303219c0615a280d3cf4a5e82bdbba21f8e35373de5426910986b96beb399f']);
                    } else {
                        this.demanda = response;
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
                            this._router.navigate(['/demanda/70098a45fdb68758e402118323a910d8e1541ab04c1bccf1252995527194d12633303219c0615a280d3cf4a5e82bdbba21f8e35373de5426910986b96beb399f']);

                        } else {
                            // Subir la imagen del alblum
                            this._uploadService.makeFileRequest(this.url +'693dd2f438b22e2c2cdfd356bd04ce3111acd176f77f2dda964f1bba0d532260/'+ id, [], this.filesToUpload, this.token, 'image')
                                .then(
                                    (result) => {
                                        this._router.navigate(['/demanda/70098a45fdb68758e402118323a910d8e1541ab04c1bccf1252995527194d12633303219c0615a280d3cf4a5e82bdbba21f8e35373de5426910986b96beb399f']);
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