import { Component, OnInit } from '@angular/core';

import { DenunciaAmbiental } from '../modelos/denuncia-ambiental';
import { DenunciaAmbientalService } from '../denuncia-ambiental/denuncia-ambiental.service';


@Component({
  selector: 'app-denuncia-ambiental-lista',
  templateUrl: './denuncia-ambiental-lista.component.html',
  styleUrl: './denuncia-ambiental-lista.component.css'
})
export class DenunciaAmbientalListaComponent implements OnInit {
  denunciasAmbientales: DenunciaAmbiental[] = [];

  
  constructor(private servicioDenunciaAmbiental: DenunciaAmbientalService) {
  }

  ngOnInit(): void {
    this.denunciasAmbientales = this.servicioDenunciaAmbiental.obtenerDenunciasAmbientales();
  }

  borrarDenunciaAmbiental(id: string) {
    this.servicioDenunciaAmbiental.borrarDenunciaAmbiental(id);
  }
}
