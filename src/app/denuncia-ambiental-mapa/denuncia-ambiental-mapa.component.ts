import { Component, OnInit, AfterViewInit } from '@angular/core';

import { DenunciaAmbiental } from '../modelos/denuncia-ambiental';
import { DenunciaAmbientalService } from '../denuncia-ambiental/denuncia-ambiental.service';

// import { Map, tileLayer, marker } from 'leaflet';
import * as L from 'leaflet';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-denuncia-ambiental-mapa',
  templateUrl: './denuncia-ambiental-mapa.component.html',
  styleUrl: './denuncia-ambiental-mapa.component.css',
})
export class DenunciaAmbientalMapaComponent implements OnInit {
  denunciasAmbientales: DenunciaAmbiental[] = [];

  constructor(
    private servicioDenunciaAmbiental: DenunciaAmbientalService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.denunciasAmbientales =
      this.servicioDenunciaAmbiental.obtenerDenunciasAmbientales();
  }

  private inicializarMapa(): void {
    const mapa = L.map('mapa').setView([10.447, -85.072], 9);

    // Control de escala
    L.control.scale().addTo(mapa);

    // Control de capas
    const controlCapas = L.control
      .layers({}, {}, { collapsed: false })
      .addTo(mapa);

    // Capas base

    const capaOSM = L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(mapa);

    const capaESRIWorldImagery = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      }
    );

    const capaCartoPositron = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
      }
    );

    controlCapas.addBaseLayer(capaOSM, 'OpenStreetMap');
    controlCapas.addBaseLayer(capaESRIWorldImagery, 'Esri WorldImagery');
    controlCapas.addBaseLayer(capaCartoPositron, 'Carto Positron');

    // Capas overlay

    this.http.get('acat.geojson').subscribe((datos: any) => {
      const capaAcat = L.geoJSON(datos, {
        style: function (feature) {
          return { color: 'orange', weight: 4, fillOpacity: 0.0 };
        },
        onEachFeature: function (feature, layer) {
          var popupText =
            '<strong>Área de Conservación</strong>: ' +
            feature.properties.nombre_ac;
          layer.bindPopup(popupText);
        },
      }).addTo(mapa);

      controlCapas.addOverlay(capaAcat, 'ACAT');
    });

    this.http.get('acat-asp.geojson').subscribe((datos: any) => {
      const capaAcatAsp = L.geoJSON(datos, {
        style: function (feature) {
          return { color: 'darkgreen', weight: 2, fillOpacity: 0.0 };
        },
        onEachFeature: function (feature, layer) {
          var popupText =
            '<strong>Área Silvestre Protegida</strong>: ' +
            feature.properties.nombre_asp +
            '<br>' +
            '<strong>Categoría de manejo</strong>: ' +
            feature.properties.cat_manejo +
            '<br>' +
            '<strong>Estatus</strong>: ' +
            feature.properties.estatus;
          layer.bindPopup(popupText);
        },
      });

      controlCapas.addOverlay(capaAcatAsp, 'ASP');
    });

    this.http.get('acat-humedales.geojson').subscribe((datos: any) => {
      const capaAcatHumedales = L.geoJSON(datos, {
        style: function (feature) {
          return { color: 'darkblue', weight: 2, fillOpacity: 0.0 };
        },
        onEachFeature: function (feature, layer) {
          var popupText =
            '<strong>Humedal</strong>: ' +
            feature.properties.nom_hum +
            '<br>' +
            '<strong>Clase</strong>: ' +
            feature.properties.clase_hum +            
            '<br>' +
            '<strong>Tipo</strong>: ' +
            feature.properties.tipo_hum;
          layer.bindPopup(popupText);
        },
      });

      controlCapas.addOverlay(capaAcatHumedales, 'Humedales');
    });    

    this.http.get('acat-cb.geojson').subscribe((datos: any) => {
      const capaAcatCb = L.geoJSON(datos, {
        style: function (feature) {
          return { color: 'black', weight: 2, fillOpacity: 0.0 };
        },
        onEachFeature: function (feature, layer) {
          var popupText =
            '<strong>Corredor Biológico</strong>: ' +
            feature.properties.nombre_cb;
          layer.bindPopup(popupText);
        },
      });

      controlCapas.addOverlay(capaAcatCb, 'Corredores biológicos');
    });

    this.http.get('acat-pne.geojson').subscribe((datos: any) => {
      const capaAcatPne = L.geoJSON(datos, {
        style: function (feature) {
          return { color: 'black', weight: 2, fillOpacity: 0.0 };
        },
        onEachFeature: function (feature, layer) {
          var popupText =
            '<strong>Finca</strong>: ' +
            feature.properties.n_finca +
            '<br>' +
            '<strong>Propietario</strong>: ' +
            feature.properties.propiet;
          layer.bindPopup(popupText);
        },
      });

      controlCapas.addOverlay(capaAcatPne, 'Patrimono Natural del Estado');
    });        

    this.http
      .get('acat-cobertura-forestal-2023.geojson')
      .subscribe((datos: any) => {
        const capaAcatCf2023 = L.geoJSON(datos, {
          style: function (feature) {
            // Verificar si 'feature' está definido
            if (!feature || !feature.properties) {
              return { color: 'lightgrey', weight: 2, fillOpacity: 0.5 };
            }

            let color = 'lightgreen';

            switch (feature.properties.Clase) {
              case 'Bosque maduro':
                color = '#228B22'; // Forest Green
                break;
              case 'Bosque secundario':
                color = '#006400'; // Dark Green
                break;
              case 'Bosque deciduo':
                color = '#32CD32'; // Lime Green
                break;
              case 'Manglar':
                color = '#FFD700'; // Gold
                break;
              case 'Plantación Forestal':
                color = '#556B2F'; // Dark Olive Green
                break;
              default:
                color = 'lightgrey';
                break;
            }

            return { color: color, weight: 2, fillOpacity: 0.5 };
          },
          onEachFeature: function (feature, layer) {
            var popupText =
              '<strong>Cobertura forestal 2023</strong>: ' +
              feature.properties.Clase;
            layer.bindPopup(popupText);
          },
        });

        controlCapas.addOverlay(capaAcatCf2023, 'Cobertura forestal 2023');
      });

    // Crear un LayerGroup para los marcadores
    const capaDenuncias = L.layerGroup();

    // Añadir los marcadores al LayerGroup
    this.denunciasAmbientales.forEach((denuncia) => {
      if (denuncia.coordenadaX && denuncia.coordenadaY) {
        L.marker([denuncia.coordenadaY, denuncia.coordenadaX])
          .bindPopup(
            `<strong>Nombre del inputado:</strong> ${denuncia.nombreImputado} <br> <strong>Fecha de la infracción:</strong> ${denuncia.fechaInfraccion}`
          )
          .addTo(capaDenuncias);
      }
    });

    // Añadir la capa de denuncias al control de capas
    controlCapas.addOverlay(capaDenuncias, 'Denuncias ambientales');

    // Añadir el LayerGroup al mapa
    capaDenuncias.addTo(mapa);
  }

  ngAfterViewInit(): void {
    this.inicializarMapa();
  }
}
