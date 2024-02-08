import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsByCategoryComponent } from './errors-by-category.component';

describe('ErrorsByCategoryComponent', () => {
  let component: ErrorsByCategoryComponent;
  let fixture: ComponentFixture<ErrorsByCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorsByCategoryComponent]
    });
    fixture = TestBed.createComponent(ErrorsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
