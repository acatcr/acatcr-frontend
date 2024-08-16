import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { DenunciaAmbientalFormaComponent } from './denuncia-ambiental-forma/denuncia-ambiental-forma.component';
import { DenunciaAmbientalListaComponent } from './denuncia-ambiental-lista/denuncia-ambiental-lista.component';
import { DenunciaAmbientalMapaComponent } from './denuncia-ambiental-mapa/denuncia-ambiental-mapa.component';
import { DenunciaAmbientalGraficoComponent } from './denuncia-ambiental-grafico/denuncia-ambiental-grafico.component';

const routes: Routes = [
  {path: "", component: PrincipalComponent},
  {path: "nuevo", component: DenunciaAmbientalFormaComponent},
  {path: "editar/:id", component: DenunciaAmbientalFormaComponent},
  {path: "lista", component: DenunciaAmbientalListaComponent},
  {path: "mapa", component: DenunciaAmbientalMapaComponent},
  {path: "grafico", component: DenunciaAmbientalGraficoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
