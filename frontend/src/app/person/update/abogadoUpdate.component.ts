import { Component, OnInit, ɵConsole } from '@angular/core';
import { AbogadoService } from '../services/abogado.services';
import { Abogado } from '../../models/abogado';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { UploadService } from '../../services/upload.service';


@Component({
    selector: 'app-editarAbogado-editar',
    templateUrl: 'abogadoUpdate.component.html',
    providers: [AbogadoService, UploadService]
})

export class AbogadoUpdateComponent implements OnInit {
    public identity;
    public token;
    public url;
    public abogado;
    

    constructor(
        private _abogadoService: AbogadoService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _uploadService: UploadService
    ) {
        this.identity = this._abogadoService.getIdentity();
        this.token = this._abogadoService.getToken();
        this.url = GLOBAL.url;
        this.abogado = new Abogado('','', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
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



    ngOnInit() {
        this.getAbogadoNow();
        let token = localStorage.getItem('token');        
    }

    getAbogadoNow() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._abogadoService.getAbogadoId(this.token, id).subscribe(
                response => {
                    if (!response) {
                        this._router.navigate(['/abogado/c05057eb5b423590a658ee06ff19b6097ff8404ea229ed9a4277fd9da0639656c7fcf1e0df0ddce6215bffb8853b5e14146cb69a5c5500e7198b6a7c417eb886']);
                    } else {
                        this.abogado = response;
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

    onEditarAbogado() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._abogadoService.editAbogado(this.token, id, this.abogado).subscribe(
                response => {
                    if (!response) {
                        console.log('Error en el servidor');
                    } else {
                        console.log('¡El abogado se ha actualizado correctamente!');
                        //this.alertMessage = '¡El album se ha actualizado correctamente!';
                        if (!this.filesToUpload) {
                            // Redirigir
                            this._router.navigate(['/abogado/b686777e88d6e6b80d295dc19596ec35a03352670e38f3524519b0bd41a069ce7c98e7ba33b4f2e9a5dff4dcb1c8f724cbd8a983af155b0f08a3a9a199017ecc']);

                        } else {
                            // Subir la imagen del alblum
                            this._uploadService.makeFileRequest(this.url +'b26d8b6ef68ade79fe920330ce7f39c8a2f6ba729f27c65383c27b9302e43e6d/'+ id, [], this.filesToUpload, this.token, 'image')
                                .then(
                                    (result) => {
                                        this._router.navigate(['/abogado/b686777e88d6e6b80d295dc19596ec35a03352670e38f3524519b0bd41a069ce7c98e7ba33b4f2e9a5dff4dcb1c8f724cbd8a983af155b0f08a3a9a199017ecc']);
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