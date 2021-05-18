export default class UpdateRequest {
    int_id: number = 0;
    approvedBy: string = "";
    status: string = "";

    constructor(int_id: number, approvedBy: string, status: string) {
        this.setINT_ID(int_id);
        this.setApprovedBy(approvedBy);
        this.setStatus(status);
    }

    setStatus = (status: string) => this.status = status;
    getStatus= () => this.status;

    setApprovedBy = (approvedBy: string) => this.approvedBy = approvedBy;
    getApprovedBy = () => this.approvedBy;

    setINT_ID = (int_id: number) => this.int_id = int_id;
    getINT_ID = () => this.int_id;

    toJSON = () => {
        return { 
            approvedBy: this.getApprovedBy(),
            int_id: this.getINT_ID(),
            status: this.getStatus(),
        }
    }

}