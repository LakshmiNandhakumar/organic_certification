import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtprofileComponent } from './ctprofile.component';

describe('CtprofileComponent', () => {
  let component: CtprofileComponent;
  let fixture: ComponentFixture<CtprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CtprofileComponent]
    });
    fixture = TestBed.createComponent(CtprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
