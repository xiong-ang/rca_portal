/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeKeywordRankComponent } from './home-keyword-rank.component';

describe('HomeKeywordRankComponent', () => {
  let component: HomeKeywordRankComponent;
  let fixture: ComponentFixture<HomeKeywordRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeKeywordRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeKeywordRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
