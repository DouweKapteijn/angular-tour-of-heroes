import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';
import { MessageService } from '../message.service';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let messageServiceMock: any;

  const mockMessage = [
    'test message 1',
    'test message 2'
  ];

  beforeEach(async () => {

    messageServiceMock = {
      messages: mockMessage,
      clear: function() {
        this.messages = [];
      }
    };

    await TestBed.configureTestingModule({
      imports: [MessagesComponent],
      providers: [{ provide: MessageService, useValue: messageServiceMock }],
    }).compileComponents();
    
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have messages', () => {
    expect(messageServiceMock.messages).toEqual(mockMessage);
  });

  it('should clear message when button is clicked', () => {
    messageServiceMock.clear();
  });

  it('should display messages section when there are messages', () => {
    messageServiceMock.messages = ['Message 1', 'Message 2'];
    fixture.detectChanges();
  
    const messagesContent = fixture.debugElement.nativeElement.textContent;
    expect(messagesContent).toContain('Message 1');
    expect(messagesContent).toContain('Message 2');
  });

  it('should not display messages section when there are no messages', () => {
    messageServiceMock.messages = [];
    fixture.detectChanges();

    const messagesSection = fixture.debugElement.nativeElement.querySelector('div');
    expect(messagesSection).toBeNull(); 
  });
});