import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a message with add function', () => {
    const message = 'Test Message';
    service.add(message);
    expect(service.messages).toContain(message);
  });

  it('should clear messages with clear function', () => {
    service.add('Test Message 1');
    service.add('Test Message 2');
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
