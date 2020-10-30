import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasComponent } from './tareas.component';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';

describe('TareasComponent', () => {
  let component: TareasComponent;
  let fixture: ComponentFixture<TareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('creo una tarea y la hago compleja',()=> {
    const crearTareaBoton = buscarElemento('crearTarea')
  });

  /* Función auxiliar que permite buscar un elemento por data-testid */
    const buscarElemento = (testId: string) => {
      const compiled = component.debugElement.nativeElement
      return compiled.querySelector(`[data-testid="${testId}"]`)
    }
});
