import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from "@angular/core";

import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Message } from './messages/message.model';

@Injectable()
export class MessageService {
    
    private messages: Message[];
    messageIsEdited = new EventEmitter<Message>();

    constructor(private http: Http){}

    public saveMessage(message: Message) {

        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});

        const token = localStorage.getItem('token') 
          ? '?token='+localStorage.getItem('token')
          :'';

        return this.http
          .post("http://localhost:3000/message"+ token, body, {headers: headers})
          .map((response: Response) => {
            const result = response.json();
            const message = new Message(result.obj.content, 'Dummy', result.obj._id, null);
            this.messages.push(message);
            return message;
          })
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
              transformedMessages.push(new Message(message.content, "Dummy", message._id, null));
            }
            this.messages = transformedMessages;
            // return from the map function
            return transformedMessages;
          })
          .catch((error: Response) => Observable.throw(error.json()));
    }

    public editMessage(message: Message){
      this.messageIsEdited.emit(message);
    }

    public updateMessage(message: Message){
      const body = JSON.stringify(message);
      const headers = new Headers({'Content-Type': 'application/json'});

      const token = localStorage.getItem('token') 
      ? '?token='+localStorage.getItem('token')
      :'';

      return this.http
        .patch("http://localhost:3000/message/" + message.messageId + token, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    public deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);  

        const token = localStorage.getItem('token') 
        ? '?token='+localStorage.getItem('token')
        :'';

        return this.http
          .delete("http://localhost:3000/message/" + message.messageId + token)
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
    }
}