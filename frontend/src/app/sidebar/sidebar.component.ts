import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { UserServiceLogin } from '../services/service.login';
import { User } from '../models/user';


declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },{
        path: '/persona',
        title: 'Personas',
        type: 'sub',
        icontype: 'person',
        collapse: 'persona',
        children: [
            {path: 'f0b648fa39712ba2bba9b2ff0ebb6044deaafbf29e6b75b89dee96ab05522cdf626ff2ad5e07aba65978faf9c241a58a3536b10a512366407ce80a3cc7db3fe5', title: 'Registrar Persona', ab:'RP'},
            {path: 'a880d76bedafc66b55868a3b4e9e661d14012154db0314cad1bb0988e516707abcdbcade36b5b26966da2696b3c3a0571e28ff2a1a8ff83b49dc26ce3d23bcda', title: 'Listar Persona', ab:'LP'}
        ]
    },{
        path: '/abogado',
        title: 'Abogados',
        type: 'sub',
        icontype: 'people_alt',
        collapse: 'abogado',
        children: [
            {path: 'c05057eb5b423590a658ee06ff19b6097ff8404ea229ed9a4277fd9da0639656c7fcf1e0df0ddce6215bffb8853b5e14146cb69a5c5500e7198b6a7c417eb886', title: 'Registrar Abogado', ab:'RA'},
            {path: 'b686777e88d6e6b80d295dc19596ec35a03352670e38f3524519b0bd41a069ce7c98e7ba33b4f2e9a5dff4dcb1c8f724cbd8a983af155b0f08a3a9a199017ecc', title: 'Listar Abogado', ab:'LA'}
        ]
    },{
        path: '/demanda',
        title: 'Demandas',
        type: 'sub',
        icontype: 'folder',
        collapse: 'demanda',
        children: [
            {path: '73d418fec8237a33c5dda0a770544df8d031077d2bc37ad0cd574bbf3e78014ca51eacc170dd67a971c7d8b7c3d50205a41452419cf11ddd1178fb27fedbd2cc', title: 'Registrar Demanda', ab:'RD'},
            {path: '70098a45fdb68758e402118323a910d8e1541ab04c1bccf1252995527194d12633303219c0615a280d3cf4a5e82bdbba21f8e35373de5426910986b96beb399f', title: 'Listar Demanda', ab:'LD'}
        ]
    }
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public identity;
    public user: User;
    public nombre;
    public apellido;
    public apellido1;
    public apellido2;
    public token;
    public imagen;
    public global;
    public tipo;
    ps: any;
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
        this.global = 'http://localhost:3000/Daniels&Aljure/1c3f34b752b47016f4071f145501442cbf11c15221ef5df02b7e0b74c864e642'
        var identityaa = JSON.parse(localStorage.getItem("identity"));
        this.nombre = identityaa.abogado.nombres_ABOGADO;
        this.apellido = identityaa.abogado.p_Apellido_ABOGADO;
        this.imagen = identityaa.abogado.imagen_ABOGADO;
        this.tipo = identityaa.abogado.tipo_ABOGADO;
    }

    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    logout(){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        localStorage.clear();
        this.token = null;
        this.identity = null;
    }
}
