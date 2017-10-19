import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Message } from './message.model';
import { MessageService } from '../message.service';


@Component({
    selector: 'app-messageInput',
    templateUrl: './message-input.component.html'
})
export class MessageInputComponent {

    constructor(private messageService : MessageService){}


    private onSubmit(newMessageForm: NgForm){

        const newMessageContent: string = newMessageForm.value.content;
        console.log(newMessageContent);

        const newMessage: Message = new Message(newMessageContent, 'Paul');
        this.messageService.saveMessage(newMessage)
        .subscribe(
            data => console.log(data), 
            error => console.log(error)
        );
        newMessageForm.resetForm();

    }
}