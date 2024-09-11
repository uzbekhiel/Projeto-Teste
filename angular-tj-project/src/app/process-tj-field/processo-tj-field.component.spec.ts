import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoTjFieldComponent } from './processo-tj-field.component';

describe('ProcessoTjFieldComponent', () => {
  let component: ProcessoTjFieldComponent;
  let fixture: ComponentFixture<ProcessoTjFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessoTjFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessoTjFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
