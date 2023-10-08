import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppdisplayfieldsComponent } from './appdisplayfields.component';

describe('AppdisplayfieldsComponent', () => {
  let component: AppdisplayfieldsComponent;
  let fixture: ComponentFixture<AppdisplayfieldsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppdisplayfieldsComponent]
    });
    fixture = TestBed.createComponent(AppdisplayfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
