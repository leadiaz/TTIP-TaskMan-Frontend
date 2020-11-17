import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';

import { ModalAgregarRolComponent } from './modal-agregar-rol.component';

describe('ModalAgregarRolComponent', () => {
  let component: ModalAgregarRolComponent;
  let fixture: ComponentFixture<ModalAgregarRolComponent>;

const authStub: any = {
    authState: {},
    auth: {
      signInWithEmailAndPassword() {
        return Promise.resolve();
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
          imports: [ RouterTestingModule.withRoutes([]),HttpClientModule, FormsModule],
      declarations: [ ModalAgregarRolComponent ],
      providers: [  {provide: AngularFireAuth, useValue: authStub}]
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
