import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarRolComponent } from './modal-agregar-rol.component';

describe('ModalAgregarRolComponent', () => {
  let component: ModalAgregarRolComponent;
  let fixture: ComponentFixture<ModalAgregarRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgregarRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
