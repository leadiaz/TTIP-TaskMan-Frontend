import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { ModalAsignarUsuarioComponent } from './modal-asignar-usuario.component';

describe('ModalAsignarUsuarioComponent', () => {
  let component: ModalAsignarUsuarioComponent;
  let fixture: ComponentFixture<ModalAsignarUsuarioComponent>;

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
        imports: [ RouterTestingModule.withRoutes([]),HttpClientModule, FormsModule],
      declarations: [ ModalAsignarUsuarioComponent ]
      // providers: [  {useValue: authStub}]
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
