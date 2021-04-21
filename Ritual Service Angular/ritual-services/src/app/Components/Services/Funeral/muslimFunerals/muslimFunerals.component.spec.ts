/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MuslimFuneralsComponent } from './muslimFunerals.component';

describe('MuslimFuneralsComponent', () => {
  let component: MuslimFuneralsComponent;
  let fixture: ComponentFixture<MuslimFuneralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuslimFuneralsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuslimFuneralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
