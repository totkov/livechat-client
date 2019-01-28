import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  @Input()
  message;

  isMineMessage = false;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.isMineMessage = this.message.authorId === this.authenticationService.getLoggedUserId();
    this.message.dateTime = new Date(this.message.dateTime + 'Z');
  }
}
