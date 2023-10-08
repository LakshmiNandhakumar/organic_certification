import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FDisplayFieldDetailsComponent } from './f-display-field-details.component';

describe('FDisplayFieldDetailsComponent', () => {
  let component: FDisplayFieldDetailsComponent;
  let fixture: ComponentFixture<FDisplayFieldDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FDisplayFieldDetailsComponent]
    });
    fixture = TestBed.createComponent(FDisplayFieldDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
