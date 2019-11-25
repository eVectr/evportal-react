import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import api_url from '../../config.js'
import moment from 'moment';

function TicketRow(props) {
	const ticket = props.ticket
	const ticketLink = `/support/ticket/${ticket.caseNo}`

	return (
		<tr key={ticket.caseNo.toString()}>
			<th scope="row"><Badge className="mr-1" color="success">Open</Badge><Link to={ticketLink}>{ticket.caseNo}</Link></th>
			<td><Link to={ticketLink}>{ticket.subject}</Link></td>
			<td>{ticket.reasontext}</td>
			<td>{moment(ticket.date).format("MMMM DD YYYY, HH:mm:ss")}</td>
		</tr>
	)
}

class SupportTickets extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ticketsData: [],
		};
	}
	
	componentDidMount() {
		fetch(api_url+'/support/tickets', {
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
						<th scope="col">date submitted</th>
					</tr>
				</thead>
				<tbody>
					{ticketList.map((ticket, index) =>
						<TicketRow key={index} ticket={ticket}/>
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
			</div>
		);
	}
}

export default SupportTickets;
