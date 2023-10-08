import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapplicationComponent } from './capplication.component';

describe('CapplicationComponent', () => {
  let component: CapplicationComponent;
  let fixture: ComponentFixture<CapplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapplicationComponent]
    });
    fixture = TestBed.createComponent(CapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
