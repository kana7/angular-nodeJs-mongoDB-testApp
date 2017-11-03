import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Message } from './message.model';
import { MessageService } from '../message.service';


@Component({
  selector: "app-messageInput",
  templateUrl: "./message-input.component.html"
})
export class MessageInputComponent implements OnInit {
  message: Message;

  constructor(private messageService: MessageService) {}

  private onSubmit(messageForm: NgForm) {
    
    if (this.message) {
        // EDIT
        this.message.content = messageForm.value.content;
        this.messageService.updateMessage(this.message).subscribe(
          (result) => {console.log(result)},
          (error) => {console.log(error)}          
        );
        this.message = null;
    } else {
        //CREATE
        const newMessageContent: string = messageForm.value.content;
        console.log(newMessageContent);
    
        const newMessage: Message = new Message(newMessageContent, "Dummy");

        this.messageService
          .saveMessage(newMessage)
          .subscribe(
            (data) => {console.log(data)}, 
            (error) => {console.log(error)}
          );

        messageForm.resetForm();
    }

  }

  private onClear(messageForm: NgForm) {
      this.message = null;
    messageForm.resetForm();
  }

  ngOnInit() {
    this.messageService.messageIsEdited.subscribe(
      (message: Message) => (this.message = message)
    );
  }
}