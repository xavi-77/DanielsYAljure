import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { SelectModule } from 'ng2-select';
import { MaterialModule } from '../app.module';
import { DemandaRoutes } from './demands.routing';

import { DemandaRegisterComponent } from './register/demandaRegister.component';
import { DemandaListComponent } from './list/demandaList.component';
import { DemandaUpdateComponent } from './update/demandaUpdate.component';
import { DemandaDetailsComponent } from './details/demandaDetails.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DemandaRoutes),
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    MaterialModule
  ],
  declarations: [
    DemandaRegisterComponent,
    DemandaListComponent,
    DemandaUpdateComponent,
    DemandaDetailsComponent
  ]
})

export class DemandasModule {}
