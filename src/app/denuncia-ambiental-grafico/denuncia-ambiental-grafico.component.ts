import { Component, OnInit } from '@angular/core';
import { DenunciaAmbientalService } from '../denuncia-ambiental/denuncia-ambiental.service';
import { DenunciaAmbiental } from '../modelos/denuncia-ambiental';

@Component({
  selector: 'app-denuncia-ambiental-grafico',
  templateUrl: './denuncia-ambiental-grafico.component.html',
  styleUrls: ['./denuncia-ambiental-grafico.component.css'],
})
export class DenunciaAmbientalGraficoComponent implements OnInit {
  denunciasAmbientales: DenunciaAmbiental[] = [];
  data: any[] = [];
  data2: any[] = [];

  view: [number, number] = [700, 400];

  // Opciones del gráfico
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Áreas Silvestres Protegidas';
  xAxisLabel2 = 'Sectores';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad de Denuncias';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private servicioDenunciaAmbiental: DenunciaAmbientalService) {}

  ngOnInit(): void {
    this.denunciasAmbientales =
      this.servicioDenunciaAmbiental.obtenerDenunciasAmbientales();

    this.generarDatosGrafico();
    this.generarDatosGrafico2();
  }

  generarDatosGrafico(): void {
    const conteoPorAsp: { [key: string]: number } = {};

    this.denunciasAmbientales.forEach((denuncia) => {
      const nombreAsp = denuncia.nombreAsp || 'Desconocido';
      if (conteoPorAsp[nombreAsp]) {
        conteoPorAsp[nombreAsp]++;
      } else {
        conteoPorAsp[nombreAsp] = 1;
      }
    });

    this.data = Object.keys(conteoPorAsp).map((nombreAsp) => ({
      name: nombreAsp,
      value: conteoPorAsp[nombreAsp],
    }));
  }

  generarDatosGrafico2(): void {
    const conteoPorSector: { [key: string]: number } = {};

    this.denunciasAmbientales.forEach((denuncia) => {
      const nombreSector = denuncia.nombreSector || 'Desconocido';
      if (conteoPorSector[nombreSector]) {
        conteoPorSector[nombreSector]++;
      } else {
        conteoPorSector[nombreSector] = 1;
      }
    });

    this.data2 = Object.keys(conteoPorSector).map((nombreSector) => ({
      name: nombreSector,
      value: conteoPorSector[nombreSector],
    }));
  }  
}
