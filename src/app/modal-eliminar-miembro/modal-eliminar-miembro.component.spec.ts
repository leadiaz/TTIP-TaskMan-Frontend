import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalEliminarMiembroComponent } from './modal-eliminar-miembro.component';

describe('ModalEliminarMiembroComponent', () => {
  let component: ModalEliminarMiembroComponent;
  let fixture: ComponentFixture<ModalEliminarMiembroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]),HttpClientModule, FormsModule],
      declarations: [ ModalEliminarMiembroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarMiembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
