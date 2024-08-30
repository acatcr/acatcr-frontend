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

  tiposDelito: string[] = [
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
  ];

  asps: string[] = [
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
    'PN Volcán Tenorio'    
  ];  

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
      tipoDelito: ['', Validators.required],
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
