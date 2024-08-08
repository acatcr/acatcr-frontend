import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciaAmbientalFormaComponent } from './denuncia-ambiental-forma.component';

describe('DenunciaAmbientalFormaComponent', () => {
  let component: DenunciaAmbientalFormaComponent;
  let fixture: ComponentFixture<DenunciaAmbientalFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DenunciaAmbientalFormaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenunciaAmbientalFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
