import User from "../entities/User.entity";
import UpdateUser from "../entities/UpdateUser.entity";

import axios from "axios";

export default class UserController {
    private url: string = "http://localhost:7000";

    private jsonToEntity = (user: any) => {
        return new User(user.id, user.name, user.username, user.password, user.title);
    }

    private getAllEmployeesHelper = (): Promise<any> => {
        return axios.get(`${this.url}/user/all`).then((response => response.data));
    }

    getAllEmployees = async () => {
        const getUsers = [await this.getAllEmployeesHelper()];
        const users = getUsers[0];
        return users.map((u: any) => 
            this.jsonToEntity(u)
        );
    }

    private getAllUserByTitleHelper = (title: string): Promise<any> => {
        return axios.get(`${this.url}/user/title/${title}`).then((response => response.data));
    }

    getAllUserByTitle = async (title: string) => {
        const getUsers = [await this.getAllUserByTitleHelper(title)];
        const users = getUsers[0];
        return users.map((u: any) => 
            this.jsonToEntity(u)
        );
    }

    updateUser = async (user: UpdateUser) => {
        await axios.put(`${this.url}/user/update/${user.getUsername()}`, user.toJSON());
    }

    private getUserHelper = (username: string):Promise<any> => {
        return axios.get(`${this.url}/user/${username}`).then((response => response.data));
    }

    getUser = async (username: string) => {
        const user = await this.getUserHelper(username);
        return this.jsonToEntity(user);
    }

}