import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBubbleComponent } from './history-bubble.component';

describe('HistoryBubbleComponent', () => {
  let component: HistoryBubbleComponent;
  let fixture: ComponentFixture<HistoryBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
