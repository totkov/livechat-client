import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.css']
})
export class ChatListItemComponent implements OnInit {

  @Input() chat;

  constructor() { }

  ngOnInit() {
  }

}
