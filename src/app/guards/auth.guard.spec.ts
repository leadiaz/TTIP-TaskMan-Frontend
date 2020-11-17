import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]),HttpClientModule],
      providers: [AuthGuard]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
