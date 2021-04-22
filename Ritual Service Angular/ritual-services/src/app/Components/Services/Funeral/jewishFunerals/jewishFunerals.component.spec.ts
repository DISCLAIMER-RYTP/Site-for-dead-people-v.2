/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JewishFuneralsComponent } from './jewishFunerals.component';

describe('JewishFuneralsComponent', () => {
  let component: JewishFuneralsComponent;
  let fixture: ComponentFixture<JewishFuneralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JewishFuneralsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JewishFuneralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
