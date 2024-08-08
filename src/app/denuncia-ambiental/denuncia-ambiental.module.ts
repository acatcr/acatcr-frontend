import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PrincipalModule } from '../principal/principal.module';
import { DenunciaAmbientalFormaComponent } from '../denuncia-ambiental-forma/denuncia-ambiental-forma.component';
import { DenunciaAmbientalListaComponent } from '../denuncia-ambiental-lista/denuncia-ambiental-lista.component';


@NgModule({
  declarations: [
    DenunciaAmbientalFormaComponent,
    DenunciaAmbientalListaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PrincipalModule
  ]
})
export class DenunciaAmbientalModule { }
