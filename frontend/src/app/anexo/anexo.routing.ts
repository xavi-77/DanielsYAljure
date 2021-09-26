import { Routes } from '@angular/router';
import { AnexoRegisterComponent } from './register/anexoRegister.component';

export const AnexoRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'anexo/632e3f16d0abc82e0f6def1ed775d72d42a2281690cc0f7c899242b953198df160131225e32d454f66279e3c9975b7dd7c02a0747ed0c9c559d76fa43f3b3b79',
        component: AnexoRegisterComponent
    }
  ]}
];
