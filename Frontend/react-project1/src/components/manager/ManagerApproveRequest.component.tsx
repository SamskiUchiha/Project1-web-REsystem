import React, { Component } from 'react'
import RequestController from '../../controller/Request.controller';
import Request from '../../entities/Request.entity';
import UpdateRequest from '../../entities/UpdateRequest.entity';

import User from '../../entities/User.entity';
import Table from 'react-bootstrap/Table';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import { Button } from 'react-bootstrap';


interface Props {
  title: string;
}

interface State {
  allRequests: Request[];
  pendingRequests: Request[];
  approvedRequests: Request[];
  deniedRequests: Request[];
  user: User | undefined;
  tabIndex: number;
  username: string;
}

/**
 * Manager can approve/deny requests
 * Manager can view all Pending requests
 * Manager can view all Resolved requests and see which manager resolved it
 */

class ManagerApproveRequest extends Component<Props, State> {
  private requestController: RequestController = new RequestController();

  private reqTableHeaders: string[] = ["ID", "Amount", "Message", "Status", "Date", "ApprovedBy", "User"];

  private tableHeaders: string[] = ["ID", "Amount", "Message", "Status", "Date", "ApprovedBy", "User", "Action"];

  constructor(props: Props) {
    super(props);
    const userJSON = localStorage.getItem("user");
    
    let user: User | undefined = undefined;

    if(userJSON) {
      const parsedUser = JSON.parse(userJSON);
      user = new User(parsedUser._id, parsedUser.name, parsedUser.password, parsedUser.title, parsedUser.username);
    }

    this.state = {
      tabIndex: 0,
      allRequests: [],
      pendingRequests: [],
      approvedRequests: [],
      deniedRequests: [],
      user: user,
      username: user?.getUsername()!,
    };
  
  }

  private renderTableHeader = () => {
    return (<tr>{this.tableHeaders.map(header => <th style={{textAlign: "center"}}>{header}</th>)}</tr>);
  }

  private renderReqTableHeader = () => {
    return (<tr>{this.reqTableHeaders.map(header => <th style={{textAlign: "center"}}>{header}</th>)}</tr>);
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
        <td style={{textAlign: "center"}}>{request.getUsername()}</td>
      </tr>
    );
  }

  private renderAcceptButton = (request: Request) => {
    return (<Button className="btn-wrapper-accept" style={{padding: 5}} variant="outline-success" onClick={() => this.acceptAction(request)}>Accept</Button>)
  }

  private renderDenyButton = (request: Request) => {
    return (<Button style={{padding: 5}} variant="outline-warning" onClick={() => this.denyAction(request)}>Deny</Button>)
  }

  private renderPendingRowRequest = (request: Request, index: number) => {
    return (
      <tr key={index}>
        <td style={{textAlign: "center"}}>{index}</td>
        <td style={{textAlign: "center"}}><h6>$</h6>{request.getAmount()}</td>
        <td style={{textAlign: "center"}}>{request.getMessage()}</td>
        <td style={{textAlign: "center"}}>{request.getStatus()}</td>
        <td style={{textAlign: "center"}}>{request.getStrDate()}</td>
        <td style={{textAlign: "center"}}>{request.getApprovedBy()}</td>
        <td style={{textAlign: "center"}}>{request.getUsername()}</td>
        <td style={{textAlign: "center"}}>
          {this.renderAcceptButton(request)}
          {this.renderDenyButton(request)}
        </td>
      </tr>
    );
  }

  private acceptAction = async (request: Request) => {
    const requestList = new UpdateRequest(request.getINT_ID(), this.state.username, "approved");
    await this.requestController.updateRequest(requestList);
  }

  private denyAction = async (request: Request) => {
    const requestList = new UpdateRequest(request.getINT_ID(), this.state.username, "denied");
    await this.requestController.updateRequest(requestList);
  }

  private renderPendingRequests = () => {
    if(this.state.pendingRequests.length === 0) {
      return;
    }
    return (
      <tbody>
        {this.state.pendingRequests.map((request: Request, index: number) => this.renderPendingRowRequest(request, index))}
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

  private renderAllRequests = () => {
    if(this.state.allRequests.length === 0) {
      return;
    }
    return (
      <tbody>
        {this.state.allRequests.map((request: Request, index: number) => this.renderRequest(request, index))}
      </tbody>
    );
  }

  private renderDeniedRequests = () => {
    if(this.state.allRequests.length === 0) {
      return;
    }
    return (
      <tbody>
        {this.state.deniedRequests.map((request: Request, index: number) => this.renderRequest(request, index))}
      </tbody>
    );
  }

  async componentDidMount() {
    await this.requestController.getAllRequest()
    .then((requests: Request[]) =>{
      this.setState({allRequests: requests})
    });

    await this.requestController.getRequestByStatus("pending")
    .then((requests: Request[]) =>{
      this.setState({pendingRequests: requests})
    });

    await this.requestController.getRequestByStatus("approved")
    .then((requests: Request[]) =>{
      this.setState({approvedRequests: requests})
    });

    await this.requestController.getRequestByStatus("denied")
    .then((requests: Request[]) =>{
      this.setState({deniedRequests: requests})
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
                <Tab tabIndex="0"><Button variant="dark">{"All"}</Button></Tab>
                <Tab tabIndex="1"><Button variant="outline-dark">{"Pending"}</Button></Tab>
                <Tab tabIndex="2"><Button variant="outline-dark">{"Approved"}</Button></Tab>
                <Tab tabIndex="3"><Button variant="outline-dark">{"Denied"}</Button></Tab>
              </TabList>

              <TabPanel>    
                <Table striped bordered hover variant="dark">
                  {this.renderReqTableHeader()}
                  {this.renderAllRequests()}
                </Table>
              </TabPanel>

              <TabPanel>
                <Table striped bordered hover variant="dark">
                  {this.renderTableHeader()}
                  {this.renderPendingRequests()}
                </Table>
              </TabPanel>

              <TabPanel>
                <Table striped bordered hover variant="dark">
                  {this.renderReqTableHeader()}
                  {this.renderApprovedRequests()}
                </Table>
              </TabPanel>

              <TabPanel>
                <Table striped bordered hover variant="dark">
                  {this.renderReqTableHeader()}
                  {this.renderDeniedRequests()}
                </Table>
              </TabPanel>

            </Tabs>
          </div>
        </div>
    )
  }
}

export default ManagerApproveRequest
