import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { SelectModule } from 'ng2-select';
import { MaterialModule } from '../app.module';
import { AnexoRoutes } from './anexo.routing';

import { AnexoRegisterComponent } from './register/anexoRegister.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AnexoRoutes),
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    MaterialModule
  ],
  declarations: [
    AnexoRegisterComponent
  ]
})

export class AnexosModule {}
