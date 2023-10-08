import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorprofileComponent } from './inspectorprofile.component';

describe('InspectorprofileComponent', () => {
  let component: InspectorprofileComponent;
  let fixture: ComponentFixture<InspectorprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InspectorprofileComponent]
    });
    fixture = TestBed.createComponent(InspectorprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
