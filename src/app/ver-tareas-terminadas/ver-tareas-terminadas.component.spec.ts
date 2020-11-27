import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTareasTerminadasComponent } from './ver-tareas-terminadas.component';

describe('VerTareasTerminadasComponent', () => {
  let component: VerTareasTerminadasComponent;
  let fixture: ComponentFixture<VerTareasTerminadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerTareasTerminadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTareasTerminadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
