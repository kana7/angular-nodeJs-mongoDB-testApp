import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Message } from './messages/message.model';

@Injectable()
export class MessageService {
    
    private messages: Message[] = [
        new Message('A message', 'Quentin.Fonck'),
        new Message('Another message', 'Jean-Pierre.Lahurie'),
        new Message('Hello World !', 'Mr patate')
    ];

    constructor(private http: Http){}

    public saveMessage(message: Message) {
        
        this.messages.push(message);
        const body = JSON.stringify(message);

        return this.http
          .post("http://localhost:3000/message", body)
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
    }
    
    public getMessages(){
        return this.messages;
    }

    public deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}