/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FilterResultComponent } from './filter-result.component';

describe('FilterResultComponent', () => {
  let component: FilterResultComponent;
  let fixture: ComponentFixture<FilterResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
