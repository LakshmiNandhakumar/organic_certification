import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdisplayComponent } from './tdisplay.component';

describe('TdisplayComponent', () => {
  let component: TdisplayComponent;
  let fixture: ComponentFixture<TdisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TdisplayComponent]
    });
    fixture = TestBed.createComponent(TdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
