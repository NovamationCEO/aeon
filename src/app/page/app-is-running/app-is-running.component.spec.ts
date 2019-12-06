import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppIsRunningComponent } from './app-is-running.component';

describe('AppIsRunningComponent', () => {
  let component: AppIsRunningComponent;
  let fixture: ComponentFixture<AppIsRunningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppIsRunningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppIsRunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
