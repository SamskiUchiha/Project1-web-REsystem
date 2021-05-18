import React from 'react'
import User from '../../entities/User.entity';

interface Props {
  title: string,
}

interface State {
  user: User | undefined;
}

/**
 * View Account Infos and Can Update their information
 */
class ManagerHome extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    const userJSON = localStorage.getItem("user");
    
    let user: User | undefined = undefined;

    if(userJSON) {
      const parsedUser = JSON.parse(userJSON);
      user = new User(parsedUser.id, parsedUser.name, parsedUser.username, parsedUser.password, parsedUser.title);     
    }

    this.state = {
      user: user,
    };

  }

  render() {
    // const {user} = this.state;
    return (
      <div>
        <h2>Welcome! {this.state.user?.getName()}</h2>
      </div>
    )
  }
}

export default ManagerHome
