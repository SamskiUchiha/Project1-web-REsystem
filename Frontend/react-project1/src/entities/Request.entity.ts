export default class Request {
    private id: string = "";
    private amount: number = 0;
    private approvedBy: string = "";
    private int_ID: number = 0;
    private message: string = "";
    private status: string = "";
    private strDate: string = "";
    private username: string = "";

    constructor(id: string, amount: number, approvedBy: string, int_ID: number, message: string, status: string, strDate: string, username: string) {
        this.setId(id);
        this.setAmount(amount);
        this.setApprovedBy(approvedBy);
        this.setINT_ID(int_ID);
        this.setMessage(message);
        this.setStatus(status);
        this.setStrDate(strDate);
        this.setUsername(username);
    }

    setStrDate = (strDate: string) => this.strDate = strDate;
    getStrDate= () => this.strDate;

    setStatus = (status: string) => this.status = status;
    getStatus= () => this.status;

    setMessage = (message: string) => this.message = message;
    getMessage = () => this.message;

    setINT_ID = (int_ID: number) => this.int_ID = int_ID;
    getINT_ID = () => this.int_ID;

    setApprovedBy = (approvedBy: string) => this.approvedBy = approvedBy;
    getApprovedBy = () => this.approvedBy;

    setAmount = (amount: number) => this.amount = amount;
    getAmount = () => this.amount;

    setId = (id: string) => this.id = id;
    getId = () => this.id;

    setUsername = (username: string) => this.username = username;
    getUsername = () => this.username;

    toJSON = (includeId?: boolean) => {
        if(includeId) {
            return { 
                id: this.getId(),
                amount: this.getAmount(),
                approvedBy: this.getApprovedBy(),
                int_ID: this.getINT_ID(),
                message: this.getMessage(),
                status: this.getStatus(),
                strDate: this.getStrDate(),
                username: this.getUsername()
            }
        }
        return { 
            amount: this.getAmount(),
            approvedBy: this.getApprovedBy(),
            int_ID: this.getINT_ID(),
            message: this.getMessage(),
            status: this.getStatus(),
            strDate: this.getStrDate(),
            username: this.getUsername()
        }
    }


}