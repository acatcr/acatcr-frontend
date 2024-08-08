import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { DenunciaAmbientalListaComponent } from './denuncia-ambiental-lista/denuncia-ambiental-lista.component';
import { DenunciaAmbientalFormaComponent } from './denuncia-ambiental-forma/denuncia-ambiental-forma.component';

const routes: Routes = [
  {path: "", component: PrincipalComponent},
  {path: "lista", component: DenunciaAmbientalListaComponent},
  {path: "nuevo", component: DenunciaAmbientalFormaComponent},
  {path: "editar/:id", component: DenunciaAmbientalFormaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
