import { Message } from './messages/message.model';

export class MessageService {

    private messages: Message[] = [
        new Message('A message', 'Quentin.Fonck'),
        new Message('Another message', 'Jean-Pierre.Lahurie'),
        new Message('Hello World !', 'Mr patate')
    ];;

    public saveMessage(message: Message) {
        this.messages.push(message);
    }
    
    public getMessages(){
        return this.messages;
    }

    public deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}