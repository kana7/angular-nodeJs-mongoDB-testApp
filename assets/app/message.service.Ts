import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Message } from './messages/message.model';

@Injectable()
export class MessageService {
    
    private messages: Message[];

    constructor(private http: Http){}

    public saveMessage(message: Message) {

        this.messages.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http
          .post("http://localhost:3000/message", body, {headers: headers})
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
    }
    
    public getMessages(){
        return this.http
          .get("http://localhost:3000/message")
          .map((response: Response) => {
            const messages = response.json().obj; //get all the messages with the attribute, coming from the server
            let transformedMessages: Message[] = [];

            // push each message in a newly created array
            for (let message of messages) {
              transformedMessages.push(new Message(message.content, "Dummy", message.id, null));
            }
            this.messages = transformedMessages;
            // return from the map function
            return transformedMessages;
          })
          .catch((error: Response) => Observable.throw(error.json()));
    }

    public deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}