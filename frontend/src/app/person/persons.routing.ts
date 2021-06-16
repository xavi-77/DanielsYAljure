import { Routes } from '@angular/router';
import { PersonDetailsComponent } from './details/personDetails.component';
import { PersonListComponent } from './list/personListcomponent';
import { PersonRegisterComponent } from './register/personRegister.component';
import { PersonUpdateComponent } from './update/personUpdate.component';

export const PersonasRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'persona/f0b648fa39712ba2bba9b2ff0ebb6044deaafbf29e6b75b89dee96ab05522cdf626ff2ad5e07aba65978faf9c241a58a3536b10a512366407ce80a3cc7db3fe5',
        component: PersonRegisterComponent
    },{
        path: 'persona/a880d76bedafc66b55868a3b4e9e661d14012154db0314cad1bb0988e516707abcdbcade36b5b26966da2696b3c3a0571e28ff2a1a8ff83b49dc26ce3d23bcda',
        component: PersonListComponent
    },{
      path: 'persona/e2f4d6f5b31e7a688b3e00183576bffe4c1a1a353ebfd04b937bc3cb1a86bcb1977e7c4cb858dc5677589d88603f23d2a6501d22a316f246b259f06ce36e8427/:id',
      component: PersonUpdateComponent
  },{
    path: 'persona/3032dc27365b7d4e6b55cdad543af764e6e57e533484a7469b93c51ef435fa2a986b126c20bce17f19129187c502c8c5e5dc6c4f78dd7180490bc63ae44c8959/:id',
    component: PersonDetailsComponent
}
  ]}
];
