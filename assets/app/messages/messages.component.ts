import { Component } from "@angular/core";

@Component({
    selector: 'app-messages',
    template: `
        <div class="row">
            <app-messageInput></app-messageInput>
        </div>
        <hr>
        <div class="row">
            <app-messageList></app-messageList>
        </div>
    `
})
export class MessagesComponent { }