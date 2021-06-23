import { Routes } from '@angular/router';
import { DemandaDetailsComponent } from './details/demandaDetails.component';
import { DemandaListComponent } from './list/demandaList.component';
import { DemandaRegisterComponent } from './register/demandaRegister.component';
import { DemandaUpdateComponent } from './update/demandaUpdate.component';

export const DemandaRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'demanda/73d418fec8237a33c5dda0a770544df8d031077d2bc37ad0cd574bbf3e78014ca51eacc170dd67a971c7d8b7c3d50205a41452419cf11ddd1178fb27fedbd2cc',
        component: DemandaRegisterComponent
    },{
        path: 'demanda/70098a45fdb68758e402118323a910d8e1541ab04c1bccf1252995527194d12633303219c0615a280d3cf4a5e82bdbba21f8e35373de5426910986b96beb399f',
        component: DemandaListComponent
    },{
      path: 'demanda/a8eb56ac895796852576a2294df407e94fe0eb34a2ff5774e3f66a46119b7ba4ab2329c6630a8623ac862b2ce48e8adf151fb4278f24a820651cb937b7f8733f/:id',
      component: DemandaUpdateComponent
  },{
    path: 'demanda/5216aab0d87c9b0c204df7fbacc093ce9bce5e110e94311c14ee1fa9cc08badd94d661af3d1b8c4f37b7606353c3332e6dedc5a1577cef4b58e8f771d87d3f05/:id',
    component: DemandaDetailsComponent
}
  ]}
];
