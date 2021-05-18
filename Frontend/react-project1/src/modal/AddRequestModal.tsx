import React, { ChangeEvent, Component, FormEvent } from 'react';
import Modal from 'react-bootstrap/Modal';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Form } from 'react-bootstrap';

import User from '../entities/User.entity';
import RequestController from "../controller/Request.controller";
import NewRequest from '../entities/NewRequest.entity';

interface Props {
//   onAddRequest: (x0: any) => void;
}

interface State {
    showModal: boolean,
    amount: number,
    message: string,
    username: string,
    user: User | undefined,
    submittedReport: boolean,
}

export default class AddRequestModal extends React.Component<Props, State> {
    private requestController = new RequestController();

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
            amount: 0,
            message: "",
            user: user,
            username: user?.getUsername()!,
            submittedReport: false,
        }
    }

    handleClose = () => this.setState({showModal: false});
    handleShow = () => this.setState({showModal: true});

    private onAmountChange = (e: ChangeEvent<any>) => this.setState({amount: e.target.value});

    private onMessageChange = (e: ChangeEvent<any>) => this.setState({message: e.target.value});


    onSubmit = async (e: FormEvent) => {
        // e.preventDefault();

        const request: NewRequest = new NewRequest(this.state.username, this.state.message, this.state.amount);
        return await this.requestController.addNewRequest(request)
            .then(() => {
                this.setState({ submittedReport: true })
                this.handleClose()
            });
    }

  render () {
    return (
      <>
        <Button variant="info" onClick={this.handleShow}>
          + New Request
        </Button>{' '}
  
        <Modal show={this.state.showModal} onHide={this.handleClose}  
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Make New Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <form onSubmit={this.onSubmit}>
                <Form.Group className="wrapper-request-div">
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            <h6>Message</h6>
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                value = {this.state.message}
                                type = "text"
                                placeholder = "reasoning"
                                onChange={this.onMessageChange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            <h6>Amount</h6>
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                value = {this.state.amount}
                                type = "number"
                                placeholder = "amount"
                                onChange={this.onAmountChange}
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