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
  data3: any[] = [];
  groupedData: any[] = [];
  groupedData2: any[] = [];

  view: [number, number] = [1200, 400];

  // Opciones del gráfico
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = 'Leyenda';
  showXAxisLabel = true;
  xAxisLabel = 'Áreas Silvestres Protegidas';
  xAxisLabel2 = 'Sectores';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad de Denuncias';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // Opciones del gráfico de pastel
  showLabels = true;
  isDoughnut = false;  

  constructor(private servicioDenunciaAmbiental: DenunciaAmbientalService) {}

  ngOnInit(): void {
    this.denunciasAmbientales =
      this.servicioDenunciaAmbiental.obtenerDenunciasAmbientales();

    this.generarDatosGrafico();
    this.generarDatosGrafico2();
    this.generarDatosGraficoDenunciasXASPSector();
    this.generarDatosGraficoDenunciasXTipoDenunciaTipoInfraccion();
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

  generarDatosGraficoDenunciasXASPSector(): void {
    const agrupadoPorAspSector: { [key: string]: { [key: string]: number } } = {};

    this.denunciasAmbientales.forEach((denuncia) => {
      const nombreAsp = denuncia.nombreAsp || 'Desconocido';
      const nombreSector = denuncia.nombreSector || 'Desconocido';

      if (!agrupadoPorAspSector[nombreAsp]) {
        agrupadoPorAspSector[nombreAsp] = {};
      }

      if (agrupadoPorAspSector[nombreAsp][nombreSector]) {
        agrupadoPorAspSector[nombreAsp][nombreSector]++;
      } else {
        agrupadoPorAspSector[nombreAsp][nombreSector] = 1;
      }
    });

    this.groupedData = Object.keys(agrupadoPorAspSector).map((nombreAsp) => {
      const sectores = Object.keys(agrupadoPorAspSector[nombreAsp]).map(
        (nombreSector) => ({
          name: nombreSector,
          value: agrupadoPorAspSector[nombreAsp][nombreSector],
        })
      );

      return {
        name: nombreAsp,
        series: sectores,
      };
    });
  }

  generarDatosGraficoDenunciasXTipoDenunciaTipoInfraccion(): void {
    const agrupadoXTipoDenunciaTipoInfraccion: { [key: string]: { [key: string]: number } } = {};

    this.denunciasAmbientales.forEach((denuncia) => {
      const nombreTipoDenuncia = denuncia.nombreTipoDenuncia || 'Desconocido';
      const nombreTipoInfraccion = denuncia.nombreTipoInfraccion || 'Desconocido';

      if (!agrupadoXTipoDenunciaTipoInfraccion[nombreTipoDenuncia]) {
        agrupadoXTipoDenunciaTipoInfraccion[nombreTipoDenuncia] = {};
      }

      if (agrupadoXTipoDenunciaTipoInfraccion[nombreTipoDenuncia][nombreTipoInfraccion]) {
        agrupadoXTipoDenunciaTipoInfraccion[nombreTipoDenuncia][nombreTipoInfraccion]++;
      } else {
        agrupadoXTipoDenunciaTipoInfraccion[nombreTipoDenuncia][nombreTipoInfraccion] = 1;
      }
    });

    this.groupedData2 = Object.keys(agrupadoXTipoDenunciaTipoInfraccion).map((nombreTipoDenuncia) => {
      const nombresTipoInfraccion = Object.keys(agrupadoXTipoDenunciaTipoInfraccion[nombreTipoDenuncia]).map(
        (nombreTipoInfraccion) => ({
          name: nombreTipoInfraccion,
          value: agrupadoXTipoDenunciaTipoInfraccion[nombreTipoDenuncia][nombreTipoInfraccion],
        })
      );

      return {
        name: nombreTipoDenuncia,
        series: nombresTipoInfraccion,
      };
    });
  } 
}

