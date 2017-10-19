import { Component, OnInit } from '@angular/core';

import { Message } from './message.model';
import { MessageService } from '../message.service';

@Component({
    selector: 'app-messageList',
    template: `
    <div class="col-md-8 col-md-offset-2">
        <app-message 
            *ngFor="let message of messagesList" 
            [message]="message" 
        ></app-message>
    </div>
    `
})
export class MessageListComponent implements OnInit{
    
    protected messagesList: Message[];

    constructor(private messageService : MessageService){}
    
    ngOnInit(){
        this.messageService
          .getMessages()
          .subscribe(
            (messages: Message[]) => {
              this.messagesList = messages;
            },
            error => console.log(error)
          );
        }
}