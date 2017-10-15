export class Message {
    // si on supprime le message, on veut s'assurer que ce soit celui qui a créer le message. donc on a besoin de connaitre l'id
    constructor(
        public content: string,
        public username: string,
        public messageId?: string,
        public userId?: string
    ){}
}