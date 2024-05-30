import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss']
})
export class MessageContainerComponent implements OnInit {

  messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.message$.subscribe(message => {
      this.messages.push(message);
      setTimeout(() => {
        this.messages = this.messages.filter(m => m !== message);
      }, 3000);
    });
  }

}
