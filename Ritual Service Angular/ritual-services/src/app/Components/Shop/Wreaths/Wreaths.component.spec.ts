/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WreathsComponent } from './Wreaths.component';

describe('WreathsComponent', () => {
  let component: WreathsComponent;
  let fixture: ComponentFixture<WreathsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WreathsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WreathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
