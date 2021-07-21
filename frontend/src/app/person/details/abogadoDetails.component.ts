import { Component, OnInit } from '@angular/core';
import { AbogadoService } from '../services/abogado.services';
import { Abogado } from '../../models/abogado';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { UploadService } from '../../services/upload.service';
import swal from 'sweetalert2';
declare var $: any;



@Component({
    selector: 'app-abogado-detalle',
    templateUrl: './abogadoDetails.component.html',
    providers: [AbogadoService, UploadService]
})

export class AbogadoDetailsComponent implements OnInit {
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
        this.abogado = new Abogado('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
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
        this.getAbogadoDetalle();
        let token = localStorage.getItem('token');

    }

    showSwal(type,type2,type3) {
        swal.fire({
            title: type2+' '+type3,
            buttonsStyling: false,
            imageUrl: type,
            customClass:{
                confirmButton: "btn btn-loginp"
              }
        })
    }
    onRegresarAbogado(){
        this._router.navigate(['/abogado/b686777e88d6e6b80d295dc19596ec35a03352670e38f3524519b0bd41a069ce7c98e7ba33b4f2e9a5dff4dcb1c8f724cbd8a983af155b0f08a3a9a199017ecc']);
    }
    

    getAbogadoDetalle() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._abogadoService.getAbogadoId(this.token, id).subscribe(
                response => {
                    if (!response) {
                        this._router.navigate(['/persona/a880d76bedafc66b55868a3b4e9e661d14012154db0314cad1bb0988e516707abcdbcade36b5b26966da2696b3c3a0571e28ff2a1a8ff83b49dc26ce3d23bcda']);
                    } else {
                        this.abogado = response;

                    }
                },
                error => {
                    var errorMessage = <any>error;

                    if (errorMessage != null) {
                        var body = JSON.parse(error._body);
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