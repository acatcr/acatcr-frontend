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

  constructor(
    private formBuilder: FormBuilder,
    private servicioDenunciaAmbiental: DenunciaAmbientalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.formaDenunciaAmbiental = this.formBuilder.group({
      sitadaId: ['', Validators.required],
      informePolicialId: ['', Validators.required],
      coordenadaX: ['', Validators.required],
      coordenadaY: ['', Validators.required],
      fechaInfraccion: ['', Validators.required],
    });

    // Se extrae el id del registro del URL
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    // Si se obtuvo un id, significa que se está editanto (no creando)
    // una denuncia
    if (id) {
      let denunciaAmbiental = this.servicioDenunciaAmbiental.obtenerDenunciaAmbiental(id);

      // Si el id existe, se llena la forma con los valores de la denuncia
      if (denunciaAmbiental) {
        this.formaDenunciaAmbiental.patchValue(denunciaAmbiental);
      }
    }
  }

  procesar() {
    if (this.formaDenunciaAmbiental.valid) {
      let denunciaAmbiental: DenunciaAmbiental = this.formaDenunciaAmbiental.value;

      // Se extrae el id del registro del URL
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      // Si se obtuvo un id, significa que se está editanto (no creando)
      // una denuncia
      if (id) {
        // Modificación de registro
        this.servicioDenunciaAmbiental.modificarDenunciaAmbiental(id, denunciaAmbiental);
      } else {
        // Nuevo registro
        this.servicioDenunciaAmbiental.agregarDenunciaAmbiental(denunciaAmbiental);
      }

      this.router.navigate(['/lista']);
    }
  }
}
