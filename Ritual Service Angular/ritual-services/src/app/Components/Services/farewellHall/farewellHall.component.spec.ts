/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FarewellHallComponent } from './farewellHall.component';

describe('FarewellHallComponent', () => {
  let component: FarewellHallComponent;
  let fixture: ComponentFixture<FarewellHallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarewellHallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarewellHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
