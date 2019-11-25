import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import api_url from '../../config.js'

function UserRow(props) {
	const user = props.user
	const userLink = `/users/${user.user_id}`
	return (
		<tr key={user.user_id.toString()}>
		<th scope="row"><Link to={userLink}>{user.user_id}</Link></th>
		<td><Link to={userLink}>{user.display_name}</Link></td>
		<td>{user.first_name}</td>
		<td>{user.last_name}</td>
		<td><Link to={userLink}>{user.email_address}</Link></td>
		</tr>
	)
}

class Users extends Component {

	constructor() {
		super();
		this.state = {
			usersData:[],
			redirect: false
		};
	}

	componentDidMount() {
		/* GET USERS FROM API */
		fetch(api_url+'/getusers', {
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token')
				//'Authorization': window.localStorage.getItem('token')
			},
		}).then((response)=> {
			if(response.status===401) {
				this.setState({
					redirect: true
				});
			}
			return response.json();
		}).then(data => {
			if(data.data.length > 0) {
				this.setState({
					usersData: JSON.parse(data.data)
				});
			}
		}).catch((error) => {
			console.log(error)
		});
	}

	render() {
		const userList = this.state.usersData;
		if (this.state.redirect === true) {
            return (<Redirect to="/login" />);
        }
		return (
			<div className="animated fadeIn">
			<Row>
				<Col xl={12}>
				<Card>
					<CardHeader>
					<i className="fa fa-align-justify"></i> Showing All Accounts
					</CardHeader>
					<CardBody>
					<Table responsive hover size="sm">
						<thead>
						<tr>
							<th scope="col">id</th>
							<th scope="col">display_name</th>
							<th scope="col">first_name</th>
							<th scope="col">last_name</th>
							<th scope="col">email_address</th>
						</tr>
						</thead>
						<tbody>
						{userList.map((user, index) =>
							<UserRow key={index} user={user}/>
						)}
						</tbody>
					</Table>
					</CardBody>
				</Card>
				</Col>
			</Row>
			</div>
		)
	}
}

export default Users;
