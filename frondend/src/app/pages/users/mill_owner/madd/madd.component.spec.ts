import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaddComponent } from './madd.component';

describe('MaddComponent', () => {
  let component: MaddComponent;
  let fixture: ComponentFixture<MaddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaddComponent]
    });
    fixture = TestBed.createComponent(MaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
