import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CappdetailsComponent } from './cappdetails.component';

describe('CappdetailsComponent', () => {
  let component: CappdetailsComponent;
  let fixture: ComponentFixture<CappdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CappdetailsComponent]
    });
    fixture = TestBed.createComponent(CappdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
