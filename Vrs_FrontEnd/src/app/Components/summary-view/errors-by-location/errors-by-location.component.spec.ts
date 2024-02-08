import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsByLocationComponent } from './errors-by-location.component';

describe('ErrorsByLocationComponent', () => {
  let component: ErrorsByLocationComponent;
  let fixture: ComponentFixture<ErrorsByLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorsByLocationComponent]
    });
    fixture = TestBed.createComponent(ErrorsByLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
