import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Badge, Alert, Card, CardBody, CardHeader, Col, Row, Collapse, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import api_url from '../../config.js';
import moment from 'moment';
import Select from 'react-select';

class TicketDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: [],
			ticketReplies: [],
			ticketCollapsed: true,
			dropdownOpen: false,
			availableAgents: [{value: 14, label: "Arian Johnson"},{value: 17, label: "Franklin Smith"},{value: 2, label: "Ben Ashton"}],
			fadeIn: true,
			deleteDialogOpen: false,
			assignDialogOpen: false,
			replyMessage: "",
			ticketRedirect: false,
			timeout: 300
		};
		this.toggleCardCollapse = this.toggleCardCollapse.bind(this);
		this.handleReply = this.handleReply.bind(this);
		this.handleReplyChange = this.handleReplyChange.bind(this);
		this.markResolved = this.markResolved.bind(this);
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.toggleDeleteDialog = this.toggleDeleteDialog.bind(this); // Delete ticket confirmation
		this.toggleAssignDialog = this.toggleAssignDialog.bind(this); // Assign ticket dialog
		this.deleteTicket = this.deleteTicket.bind(this); // Perform delete action
		this.assignTicket = this.assignTicket.bind(this); // Perform assign action
	}

	toggleCardCollapse() {
		this.setState({ ticketCollapsed: !this.state.ticketCollapsed });
	}

	toggleDropdown() {
		this.setState({ dropdownOpen: !this.state.dropdownOpen });
	}

	toggleDeleteDialog() {
		this.setState({ deleteDialogOpen: !this.state.deleteDialogOpen});
	}

	toggleAssignDialog() {
		this.setState({ assignDialogOpen: !this.state.assignDialogOpen});
	}

	deleteTicket() {
		if(localStorage.getItem("token") !== null) {
			fetch(api_url+'/support/ticket/delete', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': localStorage.getItem('token')
				},
				body: JSON.stringify({
					"caseNo" : this.props.match.params.id
				})
			}).then(results => results.json()).then(data => {
				//console.log(data);
				if(data.success === true) {
					this.setState({
						ticketRedirect: true
					});
				} else {
					//error
				}
			});
		} else {
			this.setState({
				authData: false
			});
			return false;
		}
	}

	assignTicket() {
		alert('WOOOAH NELLY hold on there bud');
	}

	handleReplyChange(event) {
		// Dynamically sets the state's key/value from whence it came (event)
		this.setState({ replyMessage: event.target.value });
	}

	handleReply(event) {
		event.preventDefault();
		if(localStorage.getItem("token") !== null) {
			fetch(api_url+'/support/ticket/reply', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': localStorage.getItem('token')
				},
				body: JSON.stringify({
					"caseNo" : this.props.match.params.id,
					"message" : this.state.replyMessage
				})
			}).then(results => results.json()).then(data => {
				//console.log(data);
				if(data.success === true) {
					//alert('message sent');
					/*this.setState({
						ticketRedirect: true
					});*/
					window.location.reload();
				} else {
					//error
					//alert('woops errror');
					return false;
				}
			});
		} else {
			this.setState({
				authData: false
			});
			return false;
		}
	}
	
	markResolved(event) {
		var r =  window.confirm("Mark this ticket resolved?");
		if (r == true) {
			if(localStorage.getItem("token") !== null) {
				fetch(api_url+'/support/ticket/update', {
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
						'x-access-token': localStorage.getItem('token')
					},
					body: JSON.stringify({
						"caseNo" : this.props.match.params.id,
						"status" : "Closed"
					})
				}).then(results => results.json()).then(data => {
					//console.log(data);
					if(data.success === true) {
						this.setState({
							ticketRedirect: true
						});
					} else {
						//error
						alert('woops errror');
						return false;
					}
				});
			}
		} else {
			// Do nothing
		} 
	}

	componentDidMount() {
		fetch(api_url+'/support/ticket?caseNo='+this.props.match.params.id, {
			method: 'get',
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': localStorage.getItem('token')
				},
		})
			.then(res => res.json())
			.then((result) => {
				this.setState({
					isLoaded: true,
					items: result.data,
					ticketReplies: result.replies,
					user: result.user
				});
				//console.log(JSON.parse(result.replies));
		},
		(error) => {
			this.setState({
					isLoaded: true,
					error
				});
			}
		);
	}
	
	render() {
		const { error, isLoaded, items, user, ticketRedirect, ticketReplies } = this.state;
		if(error) {
			return (
				<div className="animated fadeIn">
					<Row>
						<Col xs="12" lg="12">
							<Card>
								<CardBody>
									Error: {error.message}
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			);
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else if (ticketRedirect) {
			return (
				<Redirect to="/support/tickets" />
			);
		} else {
			const ticketData = JSON.parse(items);
			const userData = JSON.parse(user);
			const replies = JSON.parse(ticketReplies);
			return (
				<div className="animated fadeIn">
					<Row>
						<Col xs="12" lg="12">
							<Card>
								<CardHeader>
									<i className="fa fa-align-justify"></i> SUPPORT TICKET - {ticketData[0].caseNo} <Badge className="mr-1" color="success">Open</Badge>
									<div className="card-header-actions">
										<Dropdown className="mr-1" isOpen={this.state.dropdownOpen} toggle={() => {this.toggleDropdown();}}>
											<DropdownToggle>
												<i className="icon-settings"></i>
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem header>
													Ticket Actions
												</DropdownItem>
												<DropdownItem  onClick={this.toggleAssignDialog}>
													<i className="fa fa-share"></i> Assign Ticket
												</DropdownItem>
												<DropdownItem onClick={this.markResolved}>
													<i className="fa fa-check"></i> Mark Resolved
												</DropdownItem>
												<DropdownItem className="ev-danger" onClick={this.toggleDeleteDialog}>
													<i className="fa fa-trash"></i> Delete Ticket
												</DropdownItem>
											</DropdownMenu>
										</Dropdown>
										{/*<a className="card-header-action btn btn-minimize" data-target="#ticketBody" onClick={this.toggleCardCollapse}><i className="icon-arrow-up"></i></a>*/}
									</div>
								</CardHeader>
								<Collapse isOpen={this.state.ticketCollapsed} id="ticketBody">
									<CardBody>
										<h5>{ticketData[0].subject}</h5>
										<div className="text-muted">Submitted on {moment(ticketData[0].date).format("MMMM DD YYYY, HH:mm:ss")}</div>
										<div className="text-muted" style={{ marginBottom: '1em' }}>From: {userData.first_name} ({userData.display_name}) {userData.last_name} {"<"}{userData.email_address}{">"}</div>
										<Alert color="info">
											<pre className="ev-ticket-pre">
												{ticketData[0].message.replace(/\\/g, '')}
											</pre>
										</Alert>
										<h5>{replies.length > 0 ? 'Replies' : '' }</h5>
										{replies.map( ( {senderName, message, date, _id} ) => {
											return (
												<div key={_id}>
													<div className="text-muted">Submitted on {moment(date).format("MMMM DD YYYY, HH:mm:ss")}</div>
													<div className="text-muted" style={{ marginBottom: '1em' }}>From: {senderName}</div>
													<Alert color="secondary">
														<pre className="ev-ticket-pre">
															{message.replace(/\\/g, '')}
														</pre>
													</Alert>
												</div>
											)
										})}
									</CardBody>
								</Collapse>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col xs="12" lg="12">
							<Card>
								<CardHeader>
									<i className="fa fa-pencil-square-o"></i> Reply To Sender
								</CardHeader>
								<CardBody>
									<Input type="textarea" name="ticketReplyMessage" id="ticketReplyMessage" rows="5" placeholder="Write your reply here" onChange={this.handleReplyChange} />
									<Button type="button" size="sm" color="primary" onClick={this.handleReply} style={{ marginTop: '1em' }}><i className="fa fa-dot-circle-o"></i> Send Message</Button>
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Modal isOpen={this.state.assignDialogOpen} toggle={this.toggleAssignDialog} className={'modal-md ' + this.props.className}>
						<ModalHeader toggle={this.toggleAssignDialog}>Assign Ticket to Agent</ModalHeader>
						<ModalBody>
							<Select options={this.state.availableAgents} />
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.assignTicket}>Assign</Button>
							<Button color="secondary" onClick={this.toggleAssignDialog}>Cancel</Button>
						</ModalFooter>
					</Modal>
					<Modal isOpen={this.state.deleteDialogOpen} toggle={this.toggleDeleteDialog} className={'modal-sm ' + this.props.className}>
						<ModalHeader toggle={this.toggleDeleteDialog}>Confirm Delete</ModalHeader>
						<ModalBody>
							Really delete this ticket?
						</ModalBody>
						<ModalFooter>
							<Button color="danger" onClick={this.deleteTicket}>DELETE</Button>{' '}
							<Button color="secondary" onClick={this.toggleDeleteDialog}>Cancel</Button>
						</ModalFooter>
					</Modal>
				</div>
			);
		}
	}
}

export default TicketDetails;