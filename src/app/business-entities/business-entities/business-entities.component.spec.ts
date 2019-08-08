import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessEntitiesComponent } from './business-entities.component';

describe('BusinessEntitiesComponent', () => {
  let component: BusinessEntitiesComponent;
  let fixture: ComponentFixture<BusinessEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
