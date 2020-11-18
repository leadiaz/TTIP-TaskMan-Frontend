import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { TareasComponent } from './tareas.component';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';
import { ModalAgregarRolComponent } from '../modal-agregar-rol/modal-agregar-rol.component';
import { ModalAsignarUsuarioComponent } from '../modal-asignar-usuario/modal-asignar-usuario.component';
import { ModalNuevaTareaComponent } from '../modal-nueva-tarea/modal-nueva-tarea.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';




describe('TareasComponent', () => {
  let component: TareasComponent;
  let fixture: ComponentFixture<TareasComponent>;

// const authStub: any = {
//     authState: {},
//     auth: {
//       signInWithEmailAndPassword() {
//         return Promise.resolve();
//       }
//     }
//   };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [ RouterTestingModule.withRoutes([]),HttpClientModule,ConfirmationPopoverModule,FormsModule],
      declarations: [ TareasComponent,NavbarComponentComponent,ModalAgregarRolComponent,ModalAsignarUsuarioComponent,ModalNuevaTareaComponent ]
      // providers: [  { useValue: authStub}]
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
   // const crearTareaBoton = buscarElemento('crearTarea')
  });

  /* Función auxiliar que permite buscar un elemento por data-testid */
   /* const buscarElemento = (testId: string) => {
      const compiled = component.debugElement.nativeElement
      return compiled.querySelector(`[data-testid="${testId}"]`)
    }*/
});
