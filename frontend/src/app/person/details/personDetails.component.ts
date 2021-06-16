import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../services/person.services';
import { Persona } from '../../models/persona';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { UploadService } from '../../services/upload.service';
import swal from 'sweetalert2';
declare var $: any;



@Component({
    selector: 'app-person-detalle',
    templateUrl: './personDetails.component.html',
    providers: [PersonaService, UploadService]
})

export class PersonDetailsComponent implements OnInit {
    public identity;
    public token;
    public url;
    public persona;

    constructor(
        private _PersonaService: PersonaService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _uploadService: UploadService
    ) {
        this.identity = this._PersonaService.getIdentity();
        this.token = this._PersonaService.getToken();
        this.url = GLOBAL.url;
        this.persona = new Persona('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','','','');
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
        this.getPersonaDetalle();
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
    onDetallePersona(){
        this._router.navigate(['/persona/a880d76bedafc66b55868a3b4e9e661d14012154db0314cad1bb0988e516707abcdbcade36b5b26966da2696b3c3a0571e28ff2a1a8ff83b49dc26ce3d23bcda']);
    }
    

    getPersonaDetalle() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._PersonaService.getPersonaId(this.token, id).subscribe(
                response => {
                    if (!response) {
                        this._router.navigate(['/persona/a880d76bedafc66b55868a3b4e9e661d14012154db0314cad1bb0988e516707abcdbcade36b5b26966da2696b3c3a0571e28ff2a1a8ff83b49dc26ce3d23bcda']);
                    } else {
                        this.persona = response;

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