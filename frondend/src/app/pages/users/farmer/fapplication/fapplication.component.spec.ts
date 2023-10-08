import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FapplicationComponent } from './fapplication.component';

describe('FapplicationComponent', () => {
  let component: FapplicationComponent;
  let fixture: ComponentFixture<FapplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FapplicationComponent]
    });
    fixture = TestBed.createComponent(FapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
