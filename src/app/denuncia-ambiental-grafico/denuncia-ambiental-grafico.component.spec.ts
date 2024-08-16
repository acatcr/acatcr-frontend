import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciaAmbientalGraficoComponent } from './denuncia-ambiental-grafico.component';

describe('DenunciaAmbientalGraficoComponent', () => {
  let component: DenunciaAmbientalGraficoComponent;
  let fixture: ComponentFixture<DenunciaAmbientalGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DenunciaAmbientalGraficoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenunciaAmbientalGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
