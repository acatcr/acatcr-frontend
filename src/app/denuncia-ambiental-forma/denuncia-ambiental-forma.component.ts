import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { DenunciaAmbiental } from '../modelos/denuncia-ambiental';
import { DenunciaAmbientalService } from '../denuncia-ambiental/denuncia-ambiental.service';

@Component({
  selector: 'app-denuncia-ambiental-forma',
  templateUrl: './denuncia-ambiental-forma.component.html',
  styleUrl: './denuncia-ambiental-forma.component.css',
})
export class DenunciaAmbientalFormaComponent implements OnInit {
  formaDenunciaAmbiental: FormGroup = new FormGroup({});

  lista_asp: string[] = [
    'ZP Arenal Monteverde',
    'ZP Cuenca del Río Abangares',
    'RNVS Curi cancha',
    'Humedal Laguna Madrigal',
    'RB Lomas de Barbudal',
    'ZP Miravalles',
    'PN Miravalles - Jorge Manuel Dengo',
    'PN Palo Verde',
    'RF Taboga',
    'ZP Tenorio',
    'PN Volcán Tenorio',
  ];

  lista_sector: { [key: string]: string[] } = {
    'ZP Arenal Monteverde': [],
    'ZP Cuenca del Río Abangares': [
      'Sierra',
      'Boston',
      'Aguas Claras',
      'Gongolona',
      'Candelaria',
      'Marsellesa',
      'Tanque de captación',
    ],
    'RNVS Curi Cancha': [],
    'Humedal Laguna Madrigal': [],
    'RB Lomas de Barbudal': [
      'Gigantes del Bosque',
      'Catarata',
      'Balas de Cañón',
      'Agua Fría',
      'Marañonal',
      'Papayito',
      'Madroño',
      'Las Mesas',
      'Guapotaliyo',
      'Torre',
      'Quiebra Patas',
      'Límite Viejo',
    ],
    // 'ZP Miravalles': ['La Fortuna', 'San Bernardo', 'Guayabo', 'Guayabal', 'Rio Naranjo', 'Bijagua', 'Limonal', 'Quipilapa', 'Armenias', 'Pata Gallo'],
    'ZP Miravalles': [
      'Cuenca del Río Zapote',
      'Cuenca del Río Naranjo',
      'Cuenca del Río Cuiqui Lapa',
      'Cuenca del Río Raudales',
    ],
    'PN Miravalles - Jorge Manuel Dengo': [
      'Cabro Muco',
      'La Giganta',
      'Cerro Plano',
      'Zapote',
      'Altamira',
      'La Torre',
      'Cataratas Bijagua',
    ],
    'PN Palo Verde': [
      'Sendero La Venada',
      'Sendero El Mapache',
      'Sendero La Cantera',
      'Sendero La Roca',
      'Sendero El Guayacán',
      'Sendero El Pizote',
      'Sendero La Martilla',
      'Cerro Pelón',
    ],
    'RF Taboga': [
      'Incopesca',
      'Residencias',
      'LARED',
      'Portón Verde',
      'Tenori',
      'Palmar',
      'Liberianos',
      'Cortijo',
      'Pantalón',
      'Eskameca',
    ],
    'ZP Tenorio': [
      'Quebradón',
      'Nueva Guatemala',
      'Agua Caliente',
      'Lago Cote',
      'El Jilguero',
    ],
    'PN Volcán Tenorio': ['Pilón', 'Río Celeste', 'Nueva Guatemala'],
  };

  sectoresFiltrados: string[] = [];

  nombresTipoDenuncia: string[] = [
    'Forestal',
    'Pesca Marítima',
    'Agua',
    'Biodiversidad / Vida Silvestre',
    'Pesca Continental',
    'Parque Nacional / Area Silvestre Protegida',
  ];

  nombresTipoInfraccion: { [key: string]: string[] } = {
    'Forestal': [
      'Tala y/o Aprovechamiento',
      'Incendio Forestal',
      'Invasión de Área Protección ',
    ],
    'Pesca Marítima': [
      'Uso de artes de pesca ilegales o no autorizadas en la licencia',
      'Pesca de especies protegidas o no autorizadas en la licencia',
      'Derrame de contaminante en el mar',
    ],
    'Agua': [
      'Aprovechamiento ilegal del agua',
      'Conexión al alcantarillado pluvial',
      'Contaminación por residuos',
    ],
    'Biodiversidad / Vida Silvestre': [
      'Acceso no autorizado a los recursos genéticos y/o bioquímicos de la biodiversidad',
      'Animal silvestre atropellado',
      'Animal silvestre electrocutado',
      'Animal silvestre que afecta actividad humana',
      'Animal silvestre que requiere rescate',
      'Arroja contaminantes a cuerpo de agua',
      'Avistamiento de animal silvestre en comunidad',
      'Cacería',
      'Comercio de animales silvestres',
      'Comercio de fauna/flora silvestre',
      'Contacto directo con animal silvestre en sitio de manejo',
      'Contacto y fotografía con animal silvestre',
      'Drenaje de humedal',
      'Envenenamiento de vida silvestre',
      'Extracción de recurso vida silvestre',
      'Gestión en sitio de manejo',
      'Interacción con cocodrilos o caimanes',
      'Maltrato de animal silvestre',
      'Relleno de humedal',
      'Tenencia ilegal de animal silvestre',
      'Transporte/trasiego de flora o fauna silvestre',
    ],
    'Pesca Continental': [
      'Uso de arte no permitido para pesca continental',
      'Extracción de recurso de pesca continental sin permiso',
      'Derrame de combustible'
    ],
    'Parque Nacional / Area Silvestre Protegida': [
      'Ingreso ilegal visitantes nacional / internacional'
    ],
  };

  nombresTipoInfraccionFiltrados: string[] = [];

  onAspChange(event: any) {
    const selectedAsp = event.target.value;
    this.sectoresFiltrados = this.lista_sector[selectedAsp] || [];
    this.formaDenunciaAmbiental.get('nombreSector')?.reset(); // Resetea el valor del sector al cambiar el ASP
  }

  onNombreTipoDenunciaChange(event: any) {
    const selectedNombreTipoDenuncia = event.target.value;
    this.nombresTipoInfraccionFiltrados =
      this.nombresTipoInfraccion[selectedNombreTipoDenuncia] || [];
    this.formaDenunciaAmbiental.get('nombreTipoInfraccion')?.reset();
  }

  constructor(
    private formBuilder: FormBuilder,
    private servicioDenunciaAmbiental: DenunciaAmbientalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formaDenunciaAmbiental = this.formBuilder.group({
      sitadaId: ['', Validators.required],
      informePolicialId: ['', Validators.required],
      coordenadaX: ['', Validators.required],
      coordenadaY: ['', Validators.required],
      nombreAsp: ['', Validators.required],
      nombreSector: ['', Validators.required],
      nombreFuncionarioResponsable: ['', Validators.required],
      fechaInfraccion: ['', Validators.required],
      nombreImputado: ['', Validators.required],
      nombreTipoDenuncia: ['', Validators.required],
      nombreTipoInfraccion: ['', Validators.required],
    });

    // Se extrae el id del registro del URL
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    // Si se obtuvo un id, significa que se está editanto (no creando)
    // una denuncia
    if (id) {
      let denunciaAmbiental =
        this.servicioDenunciaAmbiental.obtenerDenunciaAmbiental(id);

      // Si el id existe, se llena la forma con los valores de la denuncia
      if (denunciaAmbiental) {
        this.formaDenunciaAmbiental.patchValue(denunciaAmbiental);
      }
    }
  }

  procesar() {
    if (this.formaDenunciaAmbiental.valid) {
      let denunciaAmbiental: DenunciaAmbiental =
        this.formaDenunciaAmbiental.value;

      // Se extrae el id del registro del URL
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      // Si se obtuvo un id, significa que se está editanto (no creando)
      // una denuncia
      if (id) {
        // Modificación de registro
        this.servicioDenunciaAmbiental.modificarDenunciaAmbiental(
          id,
          denunciaAmbiental
        );
      } else {
        // Nuevo registro
        this.servicioDenunciaAmbiental.agregarDenunciaAmbiental(
          denunciaAmbiental
        );
      }

      this.router.navigate(['/lista']);
    }
  }
}
