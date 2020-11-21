import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { TareasComponent } from './tareas.component';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';
import { ModalAgregarRolComponent } from '../modal-agregar-rol/modal-agregar-rol.component';
import { ModalAsignarUsuarioComponent } from '../modal-asignar-usuario/modal-asignar-usuario.component';
import { ModalNuevaTareaComponent } from '../modal-nueva-tarea/modal-nueva-tarea.component';
import { ModalEliminarMiembroComponent } from '../modal-eliminar-miembro/modal-eliminar-miembro.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import {ProyectoService} from '../services/proyecto.service';
import {StubProyectoService} from '../services/stubs.service';




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
    imports: [ ConfirmationPopoverModule,RouterTestingModule.withRoutes([]),HttpClientModule,FormsModule],
      declarations: [ TareasComponent,NavbarComponentComponent,ModalAgregarRolComponent,ModalAsignarUsuarioComponent,ModalNuevaTareaComponent,ModalEliminarMiembroComponent ],
     providers: [
               { provide: ProyectoService, useClass: StubProyectoService }
             ]
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

 it('should initially show 2 pending tasks', async () => {
    expect(2).toBe(component.getTareas().length)
  })

it('first task haved the state in CREADA', async () => {
    const resultHtml = fixture.debugElement.nativeElement
    expect(resultHtml.querySelector('[data-testid="estado_1"]')).toBeTruthy()
  })


 it('Checking tarea compleja', async () => {
    const resultHtml = fixture.debugElement.nativeElement
    const checkbox = resultHtml.querySelector('[data-testid="checkTareaCompleja"]');
    expect(checkbox.checked).toBeFalsy();
    expect(resultHtml.querySelector('[data-testid="divTareaCOmpleja"]')).toBeTruthy();
    expect(resultHtml.querySelector('[data-testid="tareaCOmplejafechaEstimada"]')).toBeTruthy();
    checkbox.click();
    expect(checkbox.checked).toBeTruthy();
    expect(resultHtml.querySelector('[data-testid="tareaCOmplejafechaEstimada"]')).toBeTruthy();

  })
});
