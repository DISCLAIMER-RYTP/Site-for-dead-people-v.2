/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UrnsComponent } from './Urns.component';

describe('UrnsComponent', () => {
  let component: UrnsComponent;
  let fixture: ComponentFixture<UrnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
