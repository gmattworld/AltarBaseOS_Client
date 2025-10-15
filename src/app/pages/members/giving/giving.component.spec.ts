/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GivingComponent } from './giving.component';

describe('GivingComponent', () => {
  let component: GivingComponent;
  let fixture: ComponentFixture<GivingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GivingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
