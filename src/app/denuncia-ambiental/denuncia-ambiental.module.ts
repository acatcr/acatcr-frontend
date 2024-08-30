import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MenuPrincipalModule } from '../menu-principal/menu-principal.module';
import { DenunciaAmbientalFormaComponent } from '../denuncia-ambiental-forma/denuncia-ambiental-forma.component';
import { DenunciaAmbientalListaComponent } from '../denuncia-ambiental-lista/denuncia-ambiental-lista.component';
import { DenunciaAmbientalMapaComponent } from '../denuncia-ambiental-mapa/denuncia-ambiental-mapa.component';

import { HttpClientModule } from '@angular/common/http';
import { DenunciaAmbientalGraficoComponent } from '../denuncia-ambiental-grafico/denuncia-ambiental-grafico.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    DenunciaAmbientalFormaComponent,
    DenunciaAmbientalListaComponent,
    DenunciaAmbientalMapaComponent,
    DenunciaAmbientalGraficoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MenuPrincipalModule,
    HttpClientModule,
    NgxChartsModule,
    MatTableModule,
    MatCardModule
  ]
})
export class DenunciaAmbientalModule { }
