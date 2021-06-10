import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserServiceLogin } from '../../services/service.login';
import { AuthService } from '../../services/auth.service';


declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html',
    providers: [UserServiceLogin, AuthService]
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    public identity;
    public token;
    public user: User;
    public errorSubmita;
    public isLoggedIn;



    constructor(
        public authService: AuthService,
        private route: ActivatedRoute,
        private element: ElementRef,
        private _userServiceLogin: UserServiceLogin,
        private router: Router
    ) {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
        } else {
            this.nativeElement = element.nativeElement;
            this.sidebarVisible = false;
            this.router.navigate(['/']);
        }
        this.user = new User('','','','','','','','','');
        this.identity = null;
       

    }


    ngOnInit() {
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);

        var mainPanel = document.getElementsByClassName('main-panel')[0];
        $('.modal').on('shown.bs.modal', function () {
            mainPanel.classList.add('no-scroll');
        })
        $('.modal').on('hidden.bs.modal', function () {
            mainPanel.classList.remove('no-scroll');
        })

        this.identity = this._userServiceLogin.getIdentity();
        this.token = this._userServiceLogin.getToken();
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.remove('off-canvas-sidebar');
    }

    public onSubmita() {
        //Conseguir los datos del usuario identificado
        console.log(this.user);
        this._userServiceLogin.loginUp(this.user).subscribe(
            response => {
                let identity = response['user'];
                this.identity = identity;

                if (identity==null) {
                    $.notify({
                        icon: 'warning',
                        //Error de la id de Usuario
                        message: 'Inicio De Session No Valido contacte a el Administrador.!'
                    }, {
                        type: 'warning',
                        timer: 3000,
                        placement: {
                            from: 'top',
                            align: 'center'
                        },
                        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
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
                } else {
                    // Crear Elemento en el localStorage para tener el usuario en session.
                    localStorage.setItem('identity', JSON.stringify(identity));
                    //Conseguir el token para enviarlo en cada peticion.
                    this._userServiceLogin.loginUp(this.user, 'true').subscribe(
                        response => {
                            let token = response['token'];
                            this.token = token;
                            if (this.token.length <= 0) {
                                $.notify({
                                    icon: 'warning',
                                    //Error de la Generar Token
                                    message: 'La Clave De Encryotacion Interna no se ha generado correctamente, contacte al administrador.!'
                                }, {
                                    type: 'warning',
                                    timer: 3000,
                                    placement: {
                                        from: 'top',
                                        align: 'center'
                                    },
                                    template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
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
                            } else {
                                // Crear Elemento en el localStorage para tener el token disponible.
                                localStorage.setItem('token', token);
                                this.authService.isLoggedIn();
                            }
                        }, error => {
                            var errorSubmita = <any>error;
                            if (errorSubmita != null) {
                                var body = JSON.parse(error._body);
                                var errorSubmita = body.message;
                                $.notify({
                                    icon: 'warning',
                                    message: errorSubmita
                                }, {
                                    type: 'danger',
                                    timer: 3000,
                                    placement: {
                                        from: 'top',
                                        align: 'center'
                                    },
                                    template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
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
                            }
                        }
                    );
                }
            }, error => {
                var errorSubmita = <any>error;
                if (errorSubmita != null) {
                    var body = JSON.parse(error._body);
                    var errorSubmita = body.message;
                    $.notify({
                        icon: 'warning',
                        message: errorSubmita
                    }, {
                        type: 'danger',
                        timer: 3000,
                        placement: {
                            from: 'top',
                            align: 'center'
                        },
                        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
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
                }
            }, () => this.navigate()
        );
    }

    navigate() {
        this.router.navigateByUrl('/dashboard');
    }

    logout() {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        localStorage.clear();
        this.token = null;
        this.identity = null;
        this.router.navigateByUrl('/');
    }

}