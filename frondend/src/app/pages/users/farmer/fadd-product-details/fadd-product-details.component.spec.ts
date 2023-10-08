import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaddProductDetailsComponent } from './fadd-product-details.component';

describe('FaddProductDetailsComponent', () => {
  let component: FaddProductDetailsComponent;
  let fixture: ComponentFixture<FaddProductDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaddProductDetailsComponent]
    });
    fixture = TestBed.createComponent(FaddProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
