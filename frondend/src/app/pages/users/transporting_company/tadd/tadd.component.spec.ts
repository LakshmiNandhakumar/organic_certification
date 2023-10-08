import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaddComponent } from './tadd.component';

describe('TaddComponent', () => {
  let component: TaddComponent;
  let fixture: ComponentFixture<TaddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaddComponent]
    });
    fixture = TestBed.createComponent(TaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
