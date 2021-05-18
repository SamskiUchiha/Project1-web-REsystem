import React, { Component } from 'react'
import RequestController from '../../controller/Request.controller';
import Request from '../../entities/Request.entity';
import User from '../../entities/User.entity';
import Table from 'react-bootstrap/Table';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import { Button } from 'react-bootstrap';
import AddRequestModal from '../../modal/AddRequestModal';

interface Props {
  title: string;
}

interface State {
  pendingRequests: Request[];
  approvedRequests: Request[];
  deniedRequests: Request[];
  user: User | undefined;
  username: string;
  tabIndex: number;
}


export default class EmployeeViewRequest extends Component<Props, State> {
  private requestController: RequestController = new RequestController();

  private tableHeaders: string[] = ["ID", "Amount", "Message", "Status", "Date", "ApprovedBy"];

  constructor(props: Props) {
    super(props);
    const userJSON = localStorage.getItem("user");
    
    let user: User | undefined = undefined;

    if(userJSON) {
      const parsedUser = JSON.parse(userJSON);
      user = new User(parsedUser._id, parsedUser.name, parsedUser.password, parsedUser.title, parsedUser.username);
    }

    this.state = {
      pendingRequests: [],
      approvedRequests: [],
      deniedRequests: [],
      user: user,
      username: user?.getUsername()!,
      tabIndex: 0,
    };
  
  }

  private renderTableHeader = () => {
    return (<tr>{this.tableHeaders.map(header => <th style={{textAlign: "center"}}>{header}</th>)}</tr>);
  }

  private renderRequest = (request: Request, index: number) => {
    return (
      <tr key={index}>
        <td style={{textAlign: "center"}}>{index}</td>
        <td style={{textAlign: "center"}}><h6>$</h6>{request.getAmount()}</td>
        <td style={{textAlign: "center"}}>{request.getMessage()}</td>
        <td style={{textAlign: "center"}}>{request.getStatus()}</td>
        <td style={{textAlign: "center"}}>{request.getStrDate()}</td>
        <td style={{textAlign: "center"}}>{request.getApprovedBy()}</td>
      </tr>
    );
  }

  private renderPendingRequests = () => {
    if(this.state.pendingRequests.length === 0) {
      return;
    }
    return (
      <tbody>
        {this.state.pendingRequests.map((request: Request, index: number) => this.renderRequest(request, index))}
      </tbody>
    );
  }

  private renderApprovedRequests = () => {
    if(this.state.approvedRequests.length === 0) {
      return;
    }
    return (
      <tbody>
        {this.state.approvedRequests.map((request: Request, index: number) => this.renderRequest(request, index))}
      </tbody>
    );
  }

  private renderDeniedRequests = () => {
    if(this.state.deniedRequests.length === 0) {
      return (
        <div>
          <h6>Nothing to see here...</h6>
        </div>
      );
    }
    return (
      <tbody>
        {this.state.deniedRequests.map((request: Request, index: number) => this.renderRequest(request, index))}
      </tbody>
    );
  }

  async componentDidMount() {
    await this.requestController.getRequestByUser(this.state.username)
    // .then((requests: Request[]) => {
    //   this.setState({requests: requests})
    // });
    .then( (requests: Request[]) => requests.filter( (request: Request) => request.getStatus() === "pending"))
    .then((filteredRequests: Request[]) => {
      this.setState({pendingRequests: filteredRequests})
    })

    await this.requestController.getRequestByUser(this.state.username)
    .then( (requests: Request[]) => requests.filter( (request: Request) => request.getStatus() === "approved"))
    .then((filteredRequests: Request[]) => {
      this.setState({approvedRequests: filteredRequests})
    })

    await this.requestController.getRequestByUser(this.state.username)
    .then( (requests: Request[]) => requests.filter( (request: Request) => request.getStatus() === "denied"))
    .then((filteredRequests: Request[]) => {
      this.setState({deniedRequests: filteredRequests})
    })
  }

  render() {
    // const {user, username} = this.state;
    return (
      <div>
      <div >
        <Tabs selectedIndex={this.state.tabIndex}  onSelect={tabIndex => this.setState({ tabIndex })}>
          <TabList style= {{display: "inline"}}>
            <h2>{this.props.title}</h2>
            <Tab tabIndex="0"><Button variant="dark">{"Pending"}</Button></Tab>
            <Tab tabIndex="1"><Button variant="outline-dark">{"Approved"}</Button></Tab>
            <Tab tabIndex="2"><Button variant="outline-dark">{"Denied"}</Button></Tab>
          </TabList>
          <span className="add-wrapper">
            <AddRequestModal/>
          </span>
          

          <TabPanel>    
            <Table striped bordered hover variant="dark">
              {this.renderTableHeader()}
              {this.renderPendingRequests()}
            </Table>
          </TabPanel>

          <TabPanel>
            <Table striped bordered hover variant="dark">
              {this.renderTableHeader()}
              {this.renderApprovedRequests()}
            </Table>
          </TabPanel>

          <TabPanel>
            <Table striped bordered hover variant="dark">
              {this.renderTableHeader()}
              {this.renderDeniedRequests()}
            </Table>
          </TabPanel>

        </Tabs>
      </div>
    </div>
    )
  }
}
