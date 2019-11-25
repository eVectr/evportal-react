import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import api_url from '../../config.js'

function UserRow(props) {
	const user = props.user
	const userLink = `/users/${user.user_id}`
	return (
		<tr key={user.user_id.toString()}>
            <td><i className="nav-icon fa fa-circle text-success" style={{marginRight: "20px"}}></i> {user.first_name} {user.last_name}</td>
            <td>Busy</td>
			<td>3</td>
            <td><Link to={userLink}>{user.email_address}</Link></td>
		</tr>
	)
}

class Agents extends Component {

	constructor() {
		super();
		this.state = {
			usersData:[],
			redirect: false
		};
	}

	componentDidMount() {
		fetch(api_url+'/getagents', {
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token')
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
					    <i className="fa fa-align-justify"></i> Support Agents
					</CardHeader>
					<CardBody>
                        <Table responsive hover size="sm">
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
								<th scope="col"># Open Tickets</th>
                                <th scope="col">Email Address</th>
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

export default Agents;