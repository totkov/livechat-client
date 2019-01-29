import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { ChatService } from '../../../services/chat.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {

  @ViewChild('messageInput')
  private textBox: ElementRef;

  @Input()
  chatId;

  @Output()
  successfullySend: EventEmitter<any>;

  constructor(
    private chatService: ChatService,
    private alertService: AlertService
  ) {
    this.successfullySend = new EventEmitter();
  }

  ngOnInit() {
  }

  send(message: string) {
    this.chatService.sendMessage(this.chatId, message).pipe(first()).subscribe(
      data => {
        this.successfullySend.emit({message: message, chatId: this.chatId, messageId: data.messageId});
        this.textBox.nativeElement.value = '';
      },
      error => {
        this.alertService.create('Send message error', 'danger', error.error.message);
      }
    );
  }

}
