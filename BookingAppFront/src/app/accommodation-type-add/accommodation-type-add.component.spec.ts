import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationTypeAddComponent } from './accommodation-type-add.component';

describe('AccommodationTypeAddComponent', () => {
  let component: AccommodationTypeAddComponent;
  let fixture: ComponentFixture<AccommodationTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
