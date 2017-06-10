import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationRowComponent } from './accommodation-row.component';

describe('AccommodationRowComponent', () => {
  let component: AccommodationRowComponent;
  let fixture: ComponentFixture<AccommodationRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
