import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicationlistComponent } from './view-applicationlist.component';

describe('ViewApplicationlistComponent', () => {
  let component: ViewApplicationlistComponent;
  let fixture: ComponentFixture<ViewApplicationlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewApplicationlistComponent]
    });
    fixture = TestBed.createComponent(ViewApplicationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
