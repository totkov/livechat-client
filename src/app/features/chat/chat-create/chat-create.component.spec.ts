import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCreateComponent } from './chat-create.component';

describe('ChatCreateComponent', () => {
  let component: ChatCreateComponent;
  let fixture: ComponentFixture<ChatCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
