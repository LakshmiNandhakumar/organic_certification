import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RprofileComponent } from './rprofile.component';

describe('RprofileComponent', () => {
  let component: RprofileComponent;
  let fixture: ComponentFixture<RprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RprofileComponent]
    });
    fixture = TestBed.createComponent(RprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
