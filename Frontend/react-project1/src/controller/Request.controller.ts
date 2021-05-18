import Request from "../entities/Request.entity";
import NewRequest from "../entities/NewRequest.entity";
import UpdateRequest from "../entities/UpdateRequest.entity";
import axios from "axios";

export default class RequestController {
    private url: string = "http://localhost:7000";

    /**
     * Converts JSON to Entity
     * @param request takes in a parameter request
     * @returns new Request Object
     */
    private jsonToEntity = (request: any) => {
        return new Request(
            request.id,
            request.amount,
            request.approvedBy,
            request.int_id,
            request.message,
            request.status,
            request.strDate,
            request.username);
    }

    /**
     * Add New Request to the backend, asynchronously
     * @param request takes in a parameter request
     * @returns JSON formatted request
     */
    addNewRequest = async (request: NewRequest) => {
        return await axios.put(`${this.url}/request/add`, request);
    }

    /**
     * Update a request given a request object
     * @param request takes in a parameter request
     */
    updateRequest = async (request: UpdateRequest) => {
        await axios.put(`${this.url}/request/update/${request.getINT_ID()}`, request.toJSON());
    }

    /**
     * Helper function, fetching json data from all the requests
     * @returns a Promise
     */
    private getAllRequestHelper = ():Promise<any> => {
        return axios.get(`${this.url}/request/all`).then(response => response.data);
    }

    /**
     * Get all the request sent from the server.
     * @returns a list of requests
     */
    getAllRequest = async () => {
        const requests = [await this.getAllRequestHelper()];
        const request = requests[0];
        return request.map((r: any) => this.jsonToEntity(r));
    }

    /**
     * Get all requests by username
     * @param username takes in a parameter username
     * @returns a promise that resolves when the request is successful
     */
    private getRequestByUserHelper = (username: string): Promise<any> => {
        // return axios.get(`${this.url}/request/${username}`).then(response => console.log("Response " + response.data));
        return axios.get(`${this.url}/request/${username}`).then((response => response.data));
    }

    /**
     * Get all requests by User given username 
     * @param username takes in a parameter username
     * @returns a list of requests
     */
    getRequestByUser = async (username: string) => {
        const requests = [await this.getRequestByUserHelper(username)];
        const request = requests[0];
        return request.map((r: any) => this.jsonToEntity(r));
    }

    private getRequestByStatusHelper = (status: string): Promise<any> => {
        return axios.get(`${this.url}/request/status/${status}`).then((response => response.data));
    }

    getRequestByStatus = async (status: string) => {
        const requests = [await this.getRequestByStatusHelper(status)];
        const request = requests[0];
        return request.map((r: any) => this.jsonToEntity(r));
    }
    
}