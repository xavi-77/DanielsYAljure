import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { SelectModule } from 'ng2-select';
import { MaterialModule } from '../app.module';
import { PersonasRoutes } from './persons.routing';

import { PersonRegisterComponent } from './register/personRegister.component';
import { PersonListComponent } from './list/personList.component';
import { PersonUpdateComponent } from './update/personUpdate.component';
import { PersonDetailsComponent } from './details/personDetails.component';
import { AbogadoRegisterComponent } from './register/abogadoRegister.component';
import { AbogadoUpdateComponent } from './update/abogadoUpdate.component';
import { AbogadoListComponent } from './list/abogadoList.component';
import { AbogadoDetailsComponent } from './details/abogadoDetails.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PersonasRoutes),
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    MaterialModule
  ],
  declarations: [
    PersonRegisterComponent,
    PersonListComponent,
    PersonUpdateComponent,
    PersonDetailsComponent,
    AbogadoRegisterComponent,
    AbogadoUpdateComponent,
    AbogadoListComponent,
    AbogadoDetailsComponent
  ]
})

export class PersonsModule {}
