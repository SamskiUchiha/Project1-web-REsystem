import React, { ChangeEvent, FormEvent } from 'react';
import Modal from 'react-bootstrap/Modal';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Form } from 'react-bootstrap';

import User from '../entities/User.entity';
import UpdateUser from '../entities/UpdateUser.entity';

import UserController from "../controller/User.controller";

interface Props {
//   onAddRequest: (x0: any) => void;
}

interface State {
    showModal: boolean,
    password: string,
    username: string,
    name: string,
    user: User | undefined,
    submittedReport: boolean,
}

export default class UpdateUserModal extends React.Component<Props, State> {
    private userController = new UserController();

    constructor(props: Props) {
        super(props);

        const userJSON = localStorage.getItem("user");
    
        let user: User | undefined = undefined;

        if(userJSON) {
            const parsedUser = JSON.parse(userJSON);
            user = new User(parsedUser._id, parsedUser.name, parsedUser.password, parsedUser.title, parsedUser.username);
        }

        this.state = {
            showModal: false,
            name: user?.getName()!,
            password: user?.getPassword()!,
            user: user,
            username: user?.getUsername()!,
            submittedReport: false,
        }
    }

    handleClose = () => this.setState({showModal: false});
    handleShow = () => this.setState({showModal: true});

    private onNameChange = (e: ChangeEvent<any>) => this.setState({name: e.target.value});

    private onPasswordChange = (e: ChangeEvent<any>) => this.setState({password: e.target.value});


    onSubmit = async (e: FormEvent) => {
        // e.preventDefault();
        const user: UpdateUser = new UpdateUser(this.state.username, this.state.name, this.state.password);
        return await this.userController.updateUser(user)
            .then(() => {
                this.setState({ submittedReport: true })
                this.handleClose()
            });
    }

  render () {
    return (
      <>
        <Button variant="info" onClick={this.handleShow}>
          + Change Account Info
        </Button>{' '}
  
        <Modal show={this.state.showModal} onHide={this.handleClose}  
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Update Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <form onSubmit={this.onSubmit}>
                <Form.Group className="wrapper-request-div">
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            <h6>Name</h6>
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                value = {this.state.name}
                                required
                                type = "text"
                                placeholder = {this.state.name}
                                onChange={this.onNameChange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            <h6>New Password</h6>
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                value = {this.state.password}
                                required 
                                type = "text"
                                placeholder = {this.state.password}
                                onChange={this.onPasswordChange}
                            />
                        </Col>
                    </Form.Group>
                </Form.Group>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="warning" onClick={this.onSubmit}>
              Submit
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