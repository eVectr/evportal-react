import React, { Component } from 'react';
import { Card,CardBody,Col,Row,CardHeader } from 'reactstrap';
import { Bar, Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
const line = {
	labels: ['July', 'August', 'September', 'October', 'November', 'December', 'January'],
	datasets: [
		{
			label: 'Active Users',
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'rgba(75,192,192,0.4)',
			borderColor: 'rgba(75,192,192,1)',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: 'rgba(75,192,192,1)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [111, 153, 102, 165, 142, 157, 241],
		},
		{
			label: 'New Users',
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'rgba(22,66,100,0.4)',
			borderColor: 'rgba(122, 25, 212)',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: 'rgba(22,66,100,0.4)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(22,66,100,0.4)',
			pointHoverBorderColor: 'rgba(22,66,100,0.4)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [27, 35, 22, 38, 44, 24, 36],
		},
	],
};

const bar = {
	labels: ['Jan 01', 'Jan 02', 'Jan 03', 'Jan 04', 'Jan 05', 'Jan 06', 'Jan 07'],
	datasets: [
		{
		label: 'Support Tickets',
		backgroundColor: 'rgba(255,99,132,0.2)',
		borderColor: 'rgba(255,99,132,1)',
		borderWidth: 1,
		hoverBackgroundColor: 'rgba(255,99,132,0.4)',
		hoverBorderColor: 'rgba(255,99,132,1)',
		data: [1, 3, 2, 6, 4, 2, 1],
		},
	],
};

const options = {
	tooltips: {
		enabled: false,
		custom: CustomTooltips
	},
	maintainAspectRatio: false
}

class SuperAdmin extends Component {
	render() {
		return (
			<div className="animated fadeIn">
				<Row>
					<Col sm="8">
						<Card>
							<CardHeader>Users</CardHeader>
							<CardBody>
							<div className="chart-wrapper">
								<Line data={line} options={options} />
							</div>
							</CardBody>
						</Card>
					</Col>
					<Col sm="4">
						<Card>
							<CardHeader>Support Tickets</CardHeader>
							<CardBody>
								<div className="chart-wrapper">
									<Bar data={bar} options={options} />
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}
export default SuperAdmin;