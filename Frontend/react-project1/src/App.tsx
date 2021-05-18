import React from 'react';
import './css/app.css';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';


import Home from "./components/Home.component";
import EmployeeHome from './components/employee/EmployeeHome.component';

import User from './entities/User.entity';
import NoAccess from './components/NoAccess.component';
import EmployeeViewAccount from './components/employee/EmployeeViewAccount.component';
import EmployeeViewRequest from './components/employee/EmployeeViewRequest.component';
import ManagerHome from './components/manager/ManagerHome.component';
import ManagerApproveRequest from './components/manager/ManagerApproveRequest.component';
import ManagerViewAllEmployee from './components/manager/ManagerViewAllEmployee.component';
import LoginModal from './modal/LoginModal';
import Modal from 'react-bootstrap/Modal';


interface State {
  user: User | undefined;
  loginSuccessModal: boolean;
  enableAddRequest: boolean;
}

interface Props {

}

interface Header {
  title: string,
  path: string, 
  requiresLogin: boolean,
  restrictedTo: string,
}

class App extends React.Component<Props, State> {
  /**
   * Creating navigation headers
   */
  private headers: Header[] = [
    {title: 'Home', path: '/home', requiresLogin: false, restrictedTo: "none"},

    {title: 'Home', path: '/employee-home', requiresLogin: true, restrictedTo: "employee"},
    {title: 'View Account', path: '/employee-view-account', requiresLogin: true, restrictedTo: "employee"},
    {title: 'View Request', path: '/employee-view-request', requiresLogin: true, restrictedTo: "employee"},

    {title: 'Home', path: '/manager-home', requiresLogin: true, restrictedTo: "manager"},
    {title: 'View Requests', path: '/manager-approve-request', requiresLogin: true, restrictedTo: "manager"},
    {title: 'View Users', path: '/manager-view-employee', requiresLogin: true, restrictedTo: "manager"},
  ];

  private sessionObj = {
    session: "true",
  };

  /**
   * Toggle side navigation
   */
  toggleSM = () => {
    if(document !== null) {
      const width = document.getElementById("sideMenu")!.style.width;
      const marginLeft = document.getElementById("pg-content")!.style.marginLeft;

      document.getElementById("sideMenu")!.style.width = (width === "250px" ? "0" : "250px");
      document.getElementById("pg-content")!.style.marginLeft = (marginLeft === "250px" ? "0" : "250px");
    }
  }

  constructor(props: Props) {
    super(props);
    const userJSON = localStorage.getItem("user");
    
    let user: User | undefined = undefined;

    if(userJSON) {
      const parsedUser = JSON.parse(userJSON);
      localStorage.setItem("session", JSON.stringify(this.sessionObj));
      user = new User(parsedUser._id, parsedUser.name, parsedUser.password, parsedUser.title, parsedUser.username);
    }

    this.state = {
      user: user,
      loginSuccessModal: false,
      enableAddRequest: false,
    };
  }

  onUserLogin = (user : User) => {
    this.setState({ user: user, loginSuccessModal: true, enableAddRequest: true})
    const userJSON = user.toJSON(true);
    localStorage.setItem("user", JSON.stringify(userJSON));
  }

  authorizedUser = (path: string) => {
    const userJSON = localStorage.getItem("user");
    const SessionJSON = localStorage.getItem("session");
    const parsedSession = JSON.parse(SessionJSON!);

    if(userJSON) {
      const parsedUser = JSON.parse(userJSON);
      // console.log("parsedID: " + parsedUser.id);
      // console.log("parsedNAME: " + parsedUser.name);
      // console.log("parsedUSERNAME: " + parsedUser.username);
      // console.log("parsedPASSWORD: " + parsedUser.password);
      // console.log("parsedTITLE: " + parsedUser.title);
      console.log("parsedSession: " + parsedSession.session);

      if(this.state.user === undefined) {
        return false;
      }

      if(parsedSession.session === "true") {
        if((parsedUser.title === "manager") && (path === "/manager-home" || path === "/manager-approve-request" || path === "/manager-view-employee")) {
          return true;
        }
        if((parsedUser.title === "employee") && (path === "/employee-home" || path === "/employee-make-request" || path ==="/employee-view-account" || path === "/employee-view-request")) {
          return true;
        }
      }
    }
    return false;
  }

  onUserLogOut = () => {
    this.setState({ user: undefined });
    localStorage.removeItem("user");
    localStorage.setItem("session", JSON.stringify(this.sessionObj)); 
  } 
  
  showSuccessModal = () => {
    return (
    <Modal show={this.state.loginSuccessModal} onHide={() => this.setState({loginSuccessModal: false})}  
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Login Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Successfully Logged In!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={() => this.setState({loginSuccessModal: false})}>OK</Button>
      </Modal.Footer>
    </Modal>);
  }

  render() {
    return (
      <Router>
        <div id="sideMenu" className="sideMenu">
          <div className="sm-wrapper">
            {/* <h5>Menu</h5> */}
            {
              this.headers.map((header: Header) => {
                if(header.path !== "/" && !this.authorizedUser(header.path)) {
                  return undefined;
                }
                return (<Link key={header.title} className="header-link" to={header.path}>{header.title}</Link>)
              })
            }
           
          </div>
        </div>
             
        <div id="pg-content">
          {this.showSuccessModal()}

          <Navbar className="border-bottom main-nav" style={{backgroundColor: "#FFFFFF", position: "sticky"}} fixed="top">
              <div className="menu-pointer"  onClick={this.toggleSM}>&#9776;</div>
              <Navbar.Brand><span className="brand-name"><Link to="/home">PROJECT UA</Link></span></Navbar.Brand>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                { this.state.user !== undefined ? undefined : <LoginModal onUserLogin={this.onUserLogin}/> }
                { this.state.user !== undefined ? <NavLink  to="/home" onClick={this.onUserLogOut}> <Button variant="outline-dark"> Logout </Button> </NavLink> : undefined }
                </Navbar.Text>
              </Navbar.Collapse>
            </Navbar>

            <div className="main-contents">
              <Route exact path="/home" render = {() => <Home title="Home"/>} />

              <Route path="/employee-home" render = {() => (this.authorizedUser("/employee-home")) ? <EmployeeHome title="Employee Home"/> : <NoAccess/>} />
              <Route path="/employee-view-account" render = {() => (this.authorizedUser("/employee-view-account")) ? <EmployeeViewAccount title="View Account Information"/> : <NoAccess/>} />
              <Route path="/employee-view-request" render = {() => (this.authorizedUser("/employee-view-request")) ? <EmployeeViewRequest title="View Reimbursement"/> : <NoAccess/>} />

              <Route path="/manager-home" render = {() => (this.authorizedUser("/manager-home")) ? <ManagerHome title="Manager Home"/> : <NoAccess/>} />
              <Route path="/manager-approve-request" render = {() => (this.authorizedUser("/manager-approve-request")) ? <ManagerApproveRequest title="View Requests"/> : <NoAccess/>} />
              <Route path="/manager-view-employee" render = {() => (this.authorizedUser("/manager-view-employee")) ? <ManagerViewAllEmployee title="View All Employees"/> : <NoAccess/>} />
            </div>
        </div>
      </Router>
    );
  }
}

export default App;

