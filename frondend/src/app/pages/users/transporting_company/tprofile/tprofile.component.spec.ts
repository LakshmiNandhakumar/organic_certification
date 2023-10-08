import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TprofileComponent } from './tprofile.component';

describe('TprofileComponent', () => {
  let component: TprofileComponent;
  let fixture: ComponentFixture<TprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TprofileComponent]
    });
    fixture = TestBed.createComponent(TprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
