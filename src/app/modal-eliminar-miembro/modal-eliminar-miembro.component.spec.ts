import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarMiembroComponent } from './modal-eliminar-miembro.component';

describe('ModalEliminarMiembroComponent', () => {
  let component: ModalEliminarMiembroComponent;
  let fixture: ComponentFixture<ModalEliminarMiembroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEliminarMiembroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarMiembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
