/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrossesComponent } from './Crosses.component';

describe('CrossesComponent', () => {
  let component: CrossesComponent;
  let fixture: ComponentFixture<CrossesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrossesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
