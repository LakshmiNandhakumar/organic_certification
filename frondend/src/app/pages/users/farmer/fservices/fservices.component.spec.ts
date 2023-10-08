import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FservicesComponent } from './fservices.component';

describe('FservicesComponent', () => {
  let component: FservicesComponent;
  let fixture: ComponentFixture<FservicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FservicesComponent]
    });
    fixture = TestBed.createComponent(FservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
