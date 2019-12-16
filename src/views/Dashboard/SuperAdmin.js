import React, { Component } from 'react';
import { Card,CardBody,Col,Row,CardHeader } from 'reactstrap';
import Iframe from 'react-iframe'

class SuperAdmin extends Component {
	render() {
		return (
			<div className="animated fadeIn">
				<Row>
					<Col sm="6">
						<Card>
							<CardHeader>Server Status</CardHeader>
							<CardBody>
								<Iframe url="https://evportal.bashton.ca/netdata.html"
									width="100%"
									id="serverStatus"
									className="serverStatus"
									display="initial"
									position="relative"
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}
export default SuperAdmin;