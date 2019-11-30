import React, { Component } from 'react';
import { Card,CardBody,Col,Row,CardHeader } from 'reactstrap';
//import { SocketConnect } from '../../SocketConnect.js';


class SuperAdmin extends Component {
	/*constructor(props) {
		super(props);
		// SocketConnect((err, connectedUsers) => this.setState({
		// 	connectedUsers
		// }));
	
		// this.state = {
		// 	connectedUsers: []
		// };
	}*/
	render() {
		// const listItems = this.state.connectedUsers.map((user) => <li key={user.UserId}>{user.displayName}</li>);
		return (
			<div className="animated fadeIn">
				<Row>
					<Col sm="6">
						<Card>
							<CardHeader>Who's Online</CardHeader>
							<CardBody>
							<ul>
								{/*listItems*/}
							</ul>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}
export default SuperAdmin;