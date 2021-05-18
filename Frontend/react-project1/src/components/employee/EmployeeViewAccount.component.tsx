import React from 'react'
import User from '../../entities/User.entity';
import UpdateUserModal from '../../modal/UpdateUserModal';
import UserController from '../../controller/User.controller';


interface Props {
  title: string,
}

interface State {
  user: User | undefined;
  username: string;
  userInfo: User | undefined;
}

/**
 * View Account Infos and Can Update their information
 */
class EmployeeViewAccount extends React.Component<Props, State> {
  private userController: UserController = new UserController();

  constructor(props) {
    super(props);
    const userJSON = localStorage.getItem("user");
    
    let user: User | undefined = undefined;

    if(userJSON) {
      const parsedUser = JSON.parse(userJSON);
      user = new User(parsedUser._id, parsedUser.name, parsedUser.password, parsedUser.title, parsedUser.username);
    }

    this.state = {
      userInfo: undefined,
      user: user,
      username: user?.getUsername()!,
    };

  }

  async componentDidMount() {
    await this.userController.getUser(this.state.username)
    .then((users: User) =>{
      this.setState({userInfo: users})
    });
  
  }

  render() {
    return (
      <>
        <UpdateUserModal/>
        <div>
          
          <h1>{this.props.title}</h1>
          <h2>Name: {this.state.userInfo?.getName()}</h2>
          <h2>Password: {this.state.userInfo?.getTitle()}</h2>
          <h2>Title: {this.state.userInfo?.getUsername()}</h2>
          <h2>Username: {this.state.userInfo?.getPassword()}</h2>
        </div>
      </>
    )
  }
}

export default EmployeeViewAccount
