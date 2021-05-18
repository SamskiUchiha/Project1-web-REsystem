import React from 'react'
import RequestController from '../../controller/Request.controller';
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
class EmployeeHome extends React.Component<Props, State> {
  private requestController: RequestController = new RequestController();

  constructor(props: any) {
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


  renderCard = (request: Request, index: number) => {
    
  }

  render() {
    const {user} = this.state;
    return (
      <div>
        <h2>Welcome! {user?.getName()}</h2>
        <div className="card-wrapper">
          
        </div>
      </div>
    )
  }
}

export default EmployeeHome