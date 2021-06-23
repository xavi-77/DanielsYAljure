import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../person/services/person.services';
import { DemandaService } from '../services/demanda.service';
import { Demanda } from '../../models/demanda';
import { Persona } from '../../models/persona';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { UploadService } from '../../services/upload.service';
import swal from 'sweetalert2';
declare var $: any;



@Component({
    selector: 'app-demanda-detalle',
    templateUrl: './demandaDetails.component.html',
    providers: [PersonaService, UploadService, DemandaService]
})

export class DemandaDetailsComponent implements OnInit {
    public demanda: Demanda;
    public identity;
    public token;
    public abogados: any;
    public url: string;
    public alertMessage;
    public demand;
    demandas: Demanda[];
    clientes: any;

    constructor(
        private _demandaService: DemandaService,
        private _PersonaService: PersonaService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _uploadService: UploadService
    ) {
        this.identity = this._PersonaService.getIdentity();
        this.token = this._PersonaService.getToken();
        this.url = GLOBAL.url;
        this.demanda = new Demanda('', '', '', '', '', '', '', '', '', '', '', '', '');
    } 

    ngOnInit() {
        this.getDemandaDetalle();
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
        this._router.navigate(['/demanda/70098a45fdb68758e402118323a910d8e1541ab04c1bccf1252995527194d12633303219c0615a280d3cf4a5e82bdbba21f8e35373de5426910986b96beb399f']);
    }
    

    getDemandaDetalle() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._demandaService.getDemandaId(this.token, id).subscribe(
                response => {
                    if (!response) {
                        this._router.navigate(['/demanda/70098a45fdb68758e402118323a910d8e1541ab04c1bccf1252995527194d12633303219c0615a280d3cf4a5e82bdbba21f8e35373de5426910986b96beb399f']);
                    } else {
                        this.demand = response;

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