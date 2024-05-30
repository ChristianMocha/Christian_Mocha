import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum MessageType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning'
}

export interface Message {
  severity: MessageType;
  summary: string;
  detail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new Subject<Message>();
  message$ = this.messageSubject.asObservable();

  constructor() { }

  add(message: Message) {
    this.messageSubject.next(message);
  }

  clear() {
    this.messageSubject.complete();
  }
}
