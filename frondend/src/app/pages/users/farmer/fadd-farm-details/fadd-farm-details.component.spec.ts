import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaddFarmDetailsComponent } from './fadd-farm-details.component';

describe('FaddFarmDetailsComponent', () => {
  let component: FaddFarmDetailsComponent;
  let fixture: ComponentFixture<FaddFarmDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaddFarmDetailsComponent]
    });
    fixture = TestBed.createComponent(FaddFarmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
