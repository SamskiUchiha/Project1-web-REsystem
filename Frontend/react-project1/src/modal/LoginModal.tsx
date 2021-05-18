import React from 'react';
import Modal from 'react-bootstrap/Modal';

import Col from 'react-bootstrap/Col';
import { Button, Form } from 'react-bootstrap';

import UserController from "../controller/User.controller";
import User from '../entities/User.entity';

interface Props {
  onUserLogin: (x0: any) => void;
}

interface State {
  showModal: boolean,
  showPassword: boolean,
  usernameExists: boolean,
  incorrectPassword: boolean,
  username: string,
  password: string
}

export default class LoginModal extends React.Component<Props, State> {
  private userController = new UserController();

  constructor (props: Props) {
    super(props);

    this.state = {
        showModal: false,
        showPassword: false,
        usernameExists: true,
        incorrectPassword: false,
        username: "",
        password: ""
    };
  }

  handleClose = () => this.setState({showModal: false});
  handleShow = () => this.setState({showModal: true});

  handleUsernameChange = (event: React.ChangeEvent<any>) => {
    this.setState({username: event.target.value});
    console.log(event.target.value);
  }

  handlePasswordChange = (event: React.ChangeEvent<any>) => {
    this.setState({password: event.target.value});
    console.log(event.target.value);
  }
// user.getPassword() now returns user username
// user.getTitle() now returns user password
/**
 * For some reason everything is shifted 1 more index so now getUsername = getPassword
 * @returns returns
 */
  verifyUser = async () => {
    const users = await this.userController.getAllEmployees();
    const filteredUsers = users.filter((user: User) => user.getPassword() === this.state.username);
    if (filteredUsers.length === 0) {
      this.setState({ usernameExists: false });
      return null;

    } else if (filteredUsers[0].getTitle() !== this.state.password) {
      this.setState({ incorrectPassword: true });
      return null;
    }
    return filteredUsers[0];
  }

  onSubmit = () => {
    this.verifyUser()
    .then( (user: User | null) => {
      if (user !== null) {
        this.props.onUserLogin(user);
        this.handleClose();
      }
    });
  }

  render () {
    return (
      <>
        <Button variant="outline-dark" onClick={this.handleShow}>
          Login
        </Button>{' '}
  
        <Modal show={this.state.showModal} onHide={this.handleClose}  
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form>
              <Form.Group>
                  <Form.Row>
                  {/* Enter Username Begins --------------------------- */}
                    <Col>
                      <Form.Label> Username </Form.Label>
                      <Form.Control
                          required
                          value = {this.state.username}
                          type = "text" 
                          placeholder = "Enter Username" 
                          onChange={this.handleUsernameChange}
                      />
                      { !this.state.usernameExists ? <span style={{color:"red"}}> Username does not exist. </span> : "" }
                    </Col>
                  {/* Enter Username Ends ------------------------------ */}
                  
                  {/* Enter Password Begins --------------------------- */}
                    <Col>
                      <Form.Label> Password </Form.Label>
                      <Form.Control
                          required
                          value = {this.state.password}
                          type = "password"
                          placeholder = "Enter Password" 
                          onChange={this.handlePasswordChange}
                      />

                      { this.state.incorrectPassword ? <span style={{color:"red"}}> Password is incorrect. </span> : "" }
                    </Col>

                  {/* Enter Password Ends ------------------------------ */}
                  </Form.Row>
                </Form.Group>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="warning" onClick={this.onSubmit}>
              Login
            </Button>

            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      );
    }
  }