import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

function TicketRow(props) {
	const ticket = props.ticket
	const ticketLink = `/support/ticket/${ticket.caseNo}`
    switch(ticket.Status) {
        case 'Escalating':
            var ticketColor = "warning";
        break;
        case 'Escalated':
            var ticketColor = "success";
        break;
        default:
            var ticketColor = "danger";
    } 
	return (
		<tr key={ticket.caseNo.toString()}>
            <th scope="row"><Badge className="mr-1" color={ticketColor}>{ticket.Status}</Badge>{ticket.caseNo}</th>
			<td>{ticket.subject}</td>
			<td>{ticket.reasontext}</td>
            <td>{ticket.escalateReason}</td>
			<td>{moment(ticket.date).format("MMMM DD YYYY, HH:mm:ss")}</td>
		</tr>
	)
}

class SupportTickets extends Component {
	constructor(props) {
		super(props);
		this.state = {
            ticketsData: [],
            esclatedDialogOpen: false,
        };
        
        this.toggleEscalatedDialog = this.toggleEscalatedDialog.bind(this); // Escalated ticket dialog
    }
    
    toggleEscalatedDialog() {
		this.setState({ escalatedDialogOpen: !this.state.escalatedDialogOpen });
	}
	
	componentDidMount() {
		fetch(process.env.REACT_APP_API_URL+'/support/escalations', {
			method: 'get',
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': localStorage.getItem('token')
				},
		}).then(results => results.json()).then(data => {
			//console.log(data);
			this.setState({
				ticketsData: JSON.parse(data.data)
			});
		});
	}
	
	render() {
		const ticketList = this.state.ticketsData;
		return (
			<div className="animated fadeIn">
			<Row>
			<Col xs="12" lg="12">
			<Card>
				<CardHeader>
					<i className="fa fa-align-justify"></i> ACTIVE SUPPORT TICKETS
				</CardHeader>
			<CardBody>
			<Table responsive striped  size="sm">
				<thead>
					<tr>
						<th scope="col">case number</th>
						<th scope="col">subject</th>
						<th scope="col">reason</th>
                        <th scope="col">escalation reason</th>
						<th scope="col">date submitted</th>
					</tr>
				</thead>
				<tbody>
                    {ticketList.map((ticket, index) =>
                        <tr key={ticket.caseNo.toString()} onClick={this.toggleEscalatedDialog}>
                            <th scope="row"><Badge className="mr-1" color='warning'>{ticket.Status}</Badge>{ticket.caseNo}</th>
                            <td>{ticket.subject}</td>
                            <td>{ticket.reasontext}</td>
                            <td>{ticket.escalateReason}</td>
                            <td>{moment(ticket.date).format("MMMM DD YYYY, HH:mm:ss")}</td>
                        </tr>
					)}
				</tbody>
			</Table>
			{/*<Pagination>
			<PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
			<PaginationItem active>
			<PaginationLink tag="button">1</PaginationLink>
			</PaginationItem>
			<PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
			<PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
			<PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
			<PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
			</Pagination>*/}
			</CardBody>
			</Card>
			</Col>
			</Row>
            <Modal isOpen={this.state.escalatedDialogOpen} toggle={this.toggleEscalatedDialog} className={'modal-md ' + this.props.className}>
                <ModalHeader toggle={this.toggleEscalatedDialog}>Escalate Ticket</ModalHeader>
                <ModalBody>
                    SHCWUAN
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggleEscalatedDialog}>Cancel</Button>
                </ModalFooter>
            </Modal>
			</div>
		);
	}
}

export default SupportTickets;
