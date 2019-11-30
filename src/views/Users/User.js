import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, FormGroup, Label, Input  } from 'reactstrap';

class User extends Component {

	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			usersData: [],
			userRoles: [],
			super_admin: false,
			support_super: false,
			support_agent: false,
		};
		this.handleRoleChange = this.handleRoleChange.bind(this);
	}

	componentDidMount() {
		fetch(process.env.REACT_APP_API_URL+'/getuser?id='+this.props.match.params.id, {
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token')
				//'Authorization': window.localStorage.getItem('token')
			},
		}).then(results => results.json()).then(data => {
			//console.log(data);
			this.setState({
				usersData: JSON.parse(data.data)
			});
			
			if(data.roles && data.roles.length) {
				var super_admin = JSON.parse(data.roles).filter(item => item.role_name.includes("super_admin"));
				if(super_admin.constructor.name === "Array" && super_admin.length > 0) {
					this.setState({
						super_admin: true
					});
				}
				var support_super = JSON.parse(data.roles).filter(item => item.role_name.includes("support_super"));
				if(support_super.constructor.name === "Array" && support_super.length > 0) {
					this.setState({
						support_super: true
					});
				}
				var support_agent = JSON.parse(data.roles).filter(item => item.role_name.includes("support_agent"));
				if(support_agent.constructor.name === "Array" && support_agent.length > 0) {
					this.setState({
						support_agent: true
					});
				}
			}
		});
	}

	toggle(i) {
		const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
		this.setState({
			dropdownOpen: newArray,
		});
	}

	changeUserRole(role) {
		alert(role);
	}

	handleRoleChange(e) {
		const name = e.target.name;
		const isChecked = e.target.checked;
		
		if(name==="super_admin") {
			if(isChecked) {
				this.setState({
					super_admin: true
				});
			} else {
				this.setState({
					super_admin: false
				})
			}
		}

		if(name==="support_super") {
			if(isChecked) {
				this.setState({
					support_super: true
				});
			} else {
				this.setState({
					support_super: false
				})
			}
		}

		if(name==="support_agent") {
			if(isChecked) {
				this.setState({
					support_agent: true
				});
			} else {
				this.setState({
					support_agent: false
				})
			}
		}

		fetch(process.env.REACT_APP_API_URL+'/user/setrole', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token')
			},
			body: JSON.stringify({
				"user_id" : this.props.match.params.id,
				"role_name" : name,
				"enabled": isChecked
			})
		}).then(results => results.json()).then(data => {
			//console.log(data);
		});
	}

	render() {
		const userList = this.state.usersData;
		const user = userList.find( user => user.user_id.toString() === this.props.match.params.id)
		const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> USER ID Not found</span>)]]
		return (
			<div className="animated fadeIn">
				<Row>
					<Col lg={12}>
						<Card>
							<CardHeader>
								<strong><i className="icon-info pr-1"></i>User id: {this.props.match.params.id}</strong>
							</CardHeader>
							<CardBody>
									<Table responsive striped hover size="sm">
										<tbody>
											{
												userDetails.map(([key, value]) => {
													return (
														<tr key={key}>
															<td>{`${key}:`}</td>
															<td><strong>{value}</strong></td>
														</tr>
													)
												})
											}
										</tbody>
									</Table>
							</CardBody>
						</Card>
					</Col>
				</Row>

				<Row>
					<Col lg={12}>
						<Card>
							<CardHeader>
								<strong><i className="icon-info pr-1"></i>User Roles:</strong>
							</CardHeader>
							<CardBody>
								<FormGroup check inline>
									<Input className="form-check-input" type="checkbox" id="support_agent" name="support_agent" value="support_agent" onChange={this.handleRoleChange} checked={this.state.support_agent} />
									<Label className="form-check-label" check htmlFor="support_agent">Support</Label>
								</FormGroup>
								<FormGroup check inline>
									<Input className="form-check-input" type="checkbox" id="support_super" name="support_super" value="support_super" onChange={this.handleRoleChange} checked={this.state.support_super} />
									<Label className="form-check-label" check htmlFor="support_super">Support Manager</Label>
								</FormGroup>
								<FormGroup check inline>
									<Input className="form-check-input" type="checkbox" id="super_admin" name="super_admin" value="super_admin" onChange={this.handleRoleChange} checked={this.state.super_admin} />
									<Label className="form-check-label" check htmlFor="super_admin">Super Admin</Label>
								</FormGroup>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}

export default User;
