import { Component, OnInit, ɵConsole } from '@angular/core';
import { PersonaService } from '../services/person.services';
import { Persona } from '../../models/persona';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { UploadService } from '../../services/upload.service';


@Component({
    selector: 'app-editarPerson-editar',
    templateUrl: 'personUpdate.component.html',
    providers: [PersonaService, UploadService]
})

export class PersonUpdateComponent implements OnInit {
    public identity;
    public token;
    public url;
    public persona;
    

    constructor(
        private _personService: PersonaService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _uploadService: UploadService
    ) {
        this.identity = this._personService.getIdentity();
        this.token = this._personService.getToken();
        this.url = GLOBAL.url;
        this.persona = new Persona('','', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'ACTIVO', '', '', '', '');
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



    ngOnInit() {
        this.getPersonaNow();
        let token = localStorage.getItem('token');

        
    }

    getPersonaNow() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._personService.getPersonaId(this.token, id).subscribe(
                response => {
                    if (!response) {
                        this._router.navigate(['/persona/f0b648fa39712ba2bba9b2ff0ebb6044deaafbf29e6b75b89dee96ab05522cdf626ff2ad5e07aba65978faf9c241a58a3536b10a512366407ce80a3cc7db3fe5']);
                    } else {
                        this.persona = response;
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

    onEditarPersona() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._personService.editPersona(this.token, id, this.persona).subscribe(
                response => {
                    if (!response) {
                        console.log('Error en el servidor');
                    } else {
                        console.log('¡La persona se ha actualizado correctamente!');
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