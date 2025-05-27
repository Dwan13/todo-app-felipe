import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccesibilityPage } from './accesibility.page';

describe('AccesibilityPage', () => {
  let component: AccesibilityPage;
  let fixture: ComponentFixture<AccesibilityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesibilityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
