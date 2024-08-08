import { Injectable } from '@angular/core';
import { DenunciaAmbiental } from '../modelos/denuncia-ambiental';

@Injectable({
  providedIn: 'root'
})
export class DenunciaAmbientalService {
  private denunciasAmbientales: DenunciaAmbiental[] = [];

  constructor() {
    // Denuncias ambientales almacenadas en el navegador
    let denunciasAlmacenadas = localStorage.getItem("denuncias-ambientales");
    this.denunciasAmbientales = denunciasAlmacenadas ? JSON.parse(denunciasAlmacenadas) : [];
  }

  obtenerDenunciasAmbientales(): DenunciaAmbiental[] {
    return this.denunciasAmbientales;
  }

  obtenerDenunciaAmbiental(id: string): DenunciaAmbiental | undefined {
    return this.denunciasAmbientales.find(res => res.id === id);
  }

  agregarDenunciaAmbiental(denunciaAmbiental: DenunciaAmbiental): void {
    // Asignación de un identificador único
    denunciaAmbiental.id = Date.now().toString();

    this.denunciasAmbientales.push(denunciaAmbiental);
    localStorage.setItem("denuncias-ambientales", JSON.stringify(this.denunciasAmbientales));
  }

  borrarDenunciaAmbiental(id: string): void {
    let indice = this.denunciasAmbientales.findIndex(res => res.id === id);
    this.denunciasAmbientales.splice(indice, 1);
    localStorage.setItem("denuncias-ambientales", JSON.stringify(this.denunciasAmbientales));
  }

  modificarDenunciaAmbiental(id: string, denunciaAmbiental: DenunciaAmbiental): void {
    let indice = this.denunciasAmbientales.findIndex(res => res.id === id);
    this.denunciasAmbientales[indice] = denunciaAmbiental;
    localStorage.setItem("denuncias-ambientales", JSON.stringify(this.denunciasAmbientales));
  }
}
