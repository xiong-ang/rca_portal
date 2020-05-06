/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PreventionItemComponent } from './prevention-item.component';

describe('PreventionItemComponent', () => {
  let component: PreventionItemComponent;
  let fixture: ComponentFixture<PreventionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
