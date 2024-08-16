import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciaAmbientalMapaComponent } from './denuncia-ambiental-mapa.component';

describe('DenunciaAmbientalMapaComponent', () => {
  let component: DenunciaAmbientalMapaComponent;
  let fixture: ComponentFixture<DenunciaAmbientalMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DenunciaAmbientalMapaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenunciaAmbientalMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
