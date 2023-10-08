import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FprofileComponent } from './fprofile.component';

describe('FprofileComponent', () => {
  let component: FprofileComponent;
  let fixture: ComponentFixture<FprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FprofileComponent]
    });
    fixture = TestBed.createComponent(FprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
