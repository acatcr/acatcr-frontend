import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PrincipalModule } from './principal/principal.module';
import { DenunciaAmbientalModule } from './denuncia-ambiental/denuncia-ambiental.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrincipalModule,
    DenunciaAmbientalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
