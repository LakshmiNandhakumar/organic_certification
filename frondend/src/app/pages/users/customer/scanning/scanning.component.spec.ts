import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanningComponent } from './scanning.component';

describe('ScanningComponent', () => {
  let component: ScanningComponent;
  let fixture: ComponentFixture<ScanningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScanningComponent]
    });
    fixture = TestBed.createComponent(ScanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
