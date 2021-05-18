export default class NewRequest {
    amount: number = 0;
    username: string = "";
    message: string = "";

    constructor(username: string, message: string, amount: number) {
        this.amount = amount;
        this.username = username;
        this.message = message;
    }

}