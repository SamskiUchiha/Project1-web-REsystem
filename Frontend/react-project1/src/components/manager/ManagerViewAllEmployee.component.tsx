import React, { Component } from 'react'
import UserController from '../../controller/User.controller';
import User from '../../entities/User.entity';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';



interface Props {
  title: string;
}

interface State {
  userList: User[];
  adminList: User[];
  user: User | undefined;
  counter: number;
  tabIndex: number;
}


class ManagerViewAllEmployee extends Component<Props, State> {
  private userController: UserController = new UserController();

  private tableHeaders: string[] = ["ID", "Name", "Title", "Username", "Password"];

  constructor(props: Props) {
    super(props);
    const userJSON = localStorage.getItem("user");
    
    let user: User | undefined = undefined;

    if(userJSON) {
      const parsedUser = JSON.parse(userJSON);
      user = new User(parsedUser._id, parsedUser.name, parsedUser.password, parsedUser.title, parsedUser.username);
      // console.log("NAME: " + user.getName);
    }

    this.state = {
      userList: [],
      adminList: [],
      user: user,
      counter: 0,
      tabIndex: 0,
    };
  
  }

  private renderTableHeader = () => {
    return (<tr>{this.tableHeaders.map(header => <th style={{textAlign: "center"}}>{header}</th>)}</tr>);
  }

  private renderUser = (user: User, index: number) => {
    return (
      <tr key={index}>
        <td style={{textAlign: "center"}}>{index}</td>
        <td style={{textAlign: "center"}}>{user.getName()}</td>
        <td style={{textAlign: "center"}}>{user.getUsername()}</td>
        <td style={{textAlign: "center"}}>{user.getPassword()}</td>
        <td style={{textAlign: "center"}}>{user.getTitle()}</td>
      </tr>
    );
  }

  private renderEmployees = () => {
    if(this.state.userList.length === 0) {
      return;
    }
    return (
      <tbody>
        {this.state.userList.map((u: User, index: number) => this.renderUser(u, index))}
      </tbody>
    );
  }

  private renderManagers = () => {
    if(this.state.adminList.length === 0) {
      return;
    }
    return (
      <tbody>
        {this.state.adminList.map((u: User, index: number) => this.renderUser(u, index))}
      </tbody>
    );
  }

  async componentDidMount() {
    await this.userController.getAllUserByTitle("employee")
    .then((r: User[]) =>{
      this.setState({userList: r})
    });

    await this.userController.getAllUserByTitle("manager")
    .then((r: User[]) =>{
      this.setState({adminList: r})
    });
  }

  render() {
    // const {user} = this.state;
    return (
      <div>
      <div >
        <Tabs selectedIndex={this.state.tabIndex}  onSelect={tabIndex => this.setState({ tabIndex })}>
          <TabList style= {{display: "inline"}}>
            <h2>{this.props.title}</h2>
            <Tab tabIndex="0"><Button variant="dark">{"Employees"}</Button></Tab>
            <Tab tabIndex="1"><Button variant="outline-dark">{"Managers"}</Button></Tab>
          </TabList>

          <TabPanel>    
            <Table striped bordered hover variant="dark">
              {this.renderTableHeader()}
              {this.renderEmployees()}
            </Table>
          </TabPanel>

          <TabPanel>
            <Table striped bordered hover variant="dark">
              {this.renderTableHeader()}
              {this.renderManagers()}
            </Table>
          </TabPanel>

        </Tabs>
      </div>
    </div>
    )
  }
}

export default ManagerViewAllEmployee
