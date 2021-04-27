/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RitualStuffComponent } from './Ritual-Stuff.component';

describe('RitualStuffComponent', () => {
  let component: RitualStuffComponent;
  let fixture: ComponentFixture<RitualStuffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RitualStuffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RitualStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
