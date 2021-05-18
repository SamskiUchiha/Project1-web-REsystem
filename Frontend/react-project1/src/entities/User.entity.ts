export default class User {
    private id: string = "";
    private name: string = "";
    private password: string = "";
    private title: string = "";
    private username: string = "";

    constructor(id: string, name: string, password: string, title: string, username: string) {
        this.setId(id);
        this.setName(name);
        this.setPassword(password);
        this.setTitle(title);
        this.setUsername(username);
    }

    setId = (id: string) => this.id = id;
    getId = () => this.id;

    setName = (name: string) => this.name = name;
    getName = () => this.name;
   
    setPassword = (password: string) => this.password = password;
    getPassword = () => this.password;

    setTitle = (title: string) => this.title = title;
    getTitle = () => this.title;

    setUsername = (username: string) => this.username = username;
    getUsername = () => this.username;

    toJSON = (includeId?: boolean) => {
        if(includeId) {
            return { 
                id: this.getId(),
                name: this.getName(),
                password: this.getTitle(),
                title:  this.getUsername(),
                username: this.getPassword(),
            }
        }
        return { 
            // name: this.getName(),
            // username: this.getUsername(),
            // password: this.getPassword(),
            // title: this.getTitle()
            name: this.getName(),
            password: this.getTitle(),
            title:  this.getUsername(),
            username: this.getPassword(),
        }
    }

}