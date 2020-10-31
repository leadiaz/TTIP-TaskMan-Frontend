import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNuevaTareaComponent } from './modal-nueva-tarea.component';

describe('ModalNuevaTareaComponent', () => {
  let component: ModalNuevaTareaComponent;
  let fixture: ComponentFixture<ModalNuevaTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNuevaTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNuevaTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
