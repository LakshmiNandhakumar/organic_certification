import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaddComponent } from './radd.component';

describe('RaddComponent', () => {
  let component: RaddComponent;
  let fixture: ComponentFixture<RaddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaddComponent]
    });
    fixture = TestBed.createComponent(RaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
