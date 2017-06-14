import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationTypeEditComponent } from './accommodation-type-edit.component';

describe('AccommodationTypeEditComponent', () => {
  let component: AccommodationTypeEditComponent;
  let fixture: ComponentFixture<AccommodationTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
