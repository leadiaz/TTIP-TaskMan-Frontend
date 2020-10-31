import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarUsuarioComponent } from './modal-asignar-usuario.component';

describe('ModalAsignarUsuarioComponent', () => {
  let component: ModalAsignarUsuarioComponent;
  let fixture: ComponentFixture<ModalAsignarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAsignarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
