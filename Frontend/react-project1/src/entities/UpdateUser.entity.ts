export default class User {
    private name: string = "";
    private password: string = "";
    private username: string = "";


    constructor(username: string, name: string, password: string) {
        this.setUsername(username);
        this.setName(name);
        this.setPassword(password);
    }
    setName = (name: string) => this.name = name;
    getName= () => this.name;

    setPassword = (password: string) => this.password = password;
    getPassword = () => this.password;

    setUsername = (username: string) => this.username = username;
    getUsername = () => this.username;


    toJSON = () => {
        return { 
            name: this.getName(),
            password: this.getPassword(),
            username: this.getUsername(),
        }
    }
}