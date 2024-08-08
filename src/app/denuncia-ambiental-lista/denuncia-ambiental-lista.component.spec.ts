import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciaAmbientalListaComponent } from './denuncia-ambiental-lista.component';

describe('DenunciaAmbientalListaComponent', () => {
  let component: DenunciaAmbientalListaComponent;
  let fixture: ComponentFixture<DenunciaAmbientalListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DenunciaAmbientalListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenunciaAmbientalListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
