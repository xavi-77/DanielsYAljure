import { Routes } from '@angular/router';
import { PersonDetailsComponent } from './details/personDetails.component';
import { PersonListComponent } from './list/personList.component';
import { PersonRegisterComponent } from './register/personRegister.component';
import { PersonUpdateComponent } from './update/personUpdate.component';
import { AbogadoRegisterComponent } from './register/abogadoRegister.component';
import { AbogadoUpdateComponent } from './update/abogadoUpdate.component';
import { AbogadoListComponent } from './list/abogadoList.component';
import { AbogadoDetailsComponent } from './details/abogadoDetails.component';


export const PersonasRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'persona/f0b648fa39712ba2bba9b2ff0ebb6044deaafbf29e6b75b89dee96ab05522cdf626ff2ad5e07aba65978faf9c241a58a3536b10a512366407ce80a3cc7db3fe5',
      component: PersonRegisterComponent
    }, {
      path: 'persona/a880d76bedafc66b55868a3b4e9e661d14012154db0314cad1bb0988e516707abcdbcade36b5b26966da2696b3c3a0571e28ff2a1a8ff83b49dc26ce3d23bcda',
      component: PersonListComponent
    }, {
      path: 'persona/e2f4d6f5b31e7a688b3e00183576bffe4c1a1a353ebfd04b937bc3cb1a86bcb1977e7c4cb858dc5677589d88603f23d2a6501d22a316f246b259f06ce36e8427/:id',
      component: PersonUpdateComponent
    }, {
      path: 'persona/3032dc27365b7d4e6b55cdad543af764e6e57e533484a7469b93c51ef435fa2a986b126c20bce17f19129187c502c8c5e5dc6c4f78dd7180490bc63ae44c8959/:id',
      component: PersonDetailsComponent
    }, {
      path: 'abogado/c05057eb5b423590a658ee06ff19b6097ff8404ea229ed9a4277fd9da0639656c7fcf1e0df0ddce6215bffb8853b5e14146cb69a5c5500e7198b6a7c417eb886',
      component: AbogadoRegisterComponent
    }, {
      path: 'abogado/729bf16d94da54d1102b9aa7541658e573084c1f834519aeb20c7579ca8853fae36e6b003e2b120bd83e954d9cca29e8e1e8ed6b9b4cf3685c84d81a9fbe3445/:id',
      component: AbogadoUpdateComponent
    }, {
      path: 'abogado/b686777e88d6e6b80d295dc19596ec35a03352670e38f3524519b0bd41a069ce7c98e7ba33b4f2e9a5dff4dcb1c8f724cbd8a983af155b0f08a3a9a199017ecc',
      component: AbogadoListComponent
    },{
      path: 'abogado/040f59007b69d0448125ae52f015bae54aff71ce73671f3678a896c3dbf0ba0a40f17f18be4bb7712f253a08d6bff58c4afc7c003b5c6931faeabac95dbdd6a8/:id',
      component: AbogadoDetailsComponent
    }
    ]
  }
];
