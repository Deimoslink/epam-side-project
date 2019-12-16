import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBusinessEntityComponent } from './add-edit-business-entity.component';

describe('AddEditBusinessEntityComponent', () => {
  let component: AddEditBusinessEntityComponent;
  let fixture: ComponentFixture<AddEditBusinessEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditBusinessEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBusinessEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
