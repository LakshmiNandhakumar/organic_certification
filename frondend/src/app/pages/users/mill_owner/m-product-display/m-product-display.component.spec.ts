import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MProductDisplayComponent } from './m-product-display.component';

describe('MProductDisplayComponent', () => {
  let component: MProductDisplayComponent;
  let fixture: ComponentFixture<MProductDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MProductDisplayComponent]
    });
    fixture = TestBed.createComponent(MProductDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
