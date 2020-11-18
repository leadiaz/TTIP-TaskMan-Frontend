import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';


import { ModalNuevaTareaComponent } from './modal-nueva-tarea.component';



describe('ModalNuevaTareaComponent', () => {
  let component: ModalNuevaTareaComponent;
  let fixture: ComponentFixture<ModalNuevaTareaComponent>;

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
      declarations: [ ModalNuevaTareaComponent ],
      // providers: [  {useValue: authStub}]
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
