import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import logo from '../../../assets/img/brand/header-logo.png'
import api_url from '../../../config.js'

class Login extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChanges = this.handleInputChanges.bind(this);
		this.state = {
			authenticated: false,
			username: "",
			password: "",
			loginError: ""
		};
	}

	handleInputChanges(event) {
		event.preventDefault();
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch(api_url+'/login', {
			method: 'post',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: this.state.username,
				password: this.state.password,
			})
		  }).then(results => results.json()).then(data => {
			if (typeof data.token !== 'undefined') {
				localStorage.setItem("token", data.token);
				localStorage.setItem("roles", data.roles);
				this.setState({
					loginError: "",
					authenticated: true
				});
			} else {
				this.setState({
					loginError: "Invalid login credentials"
				});
			}
		});
	}

	render() {
		if(this.state.authenticated===true) return (<Redirect from="/" to="/dashboard" />);
		return (
			<div className="app flex-row align-items-center">
				<Container>
					<Row className="justify-content-center">
						<Col md="8">
							<Card className="p-4">
								<CardBody>
									<Form onSubmit={this.handleSubmit}>
										<h1><img src={logo} alt="Logo" width="80" /> Login</h1>
										<p className="text-muted">Sign In to your account</p>
										<InputGroup className="mb-3">
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="icon-user"></i>
												</InputGroupText>
											</InputGroupAddon>
											<Input type="text" placeholder="Username" autoComplete="username" name="username" value={this.state.username} onChange={this.handleInputChanges} />
										</InputGroup>
										<InputGroup className="mb-4">
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="icon-lock"></i>
												</InputGroupText>
											</InputGroupAddon>
											<Input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInputChanges} />
										</InputGroup>
										<Row>
											<Col xs="6">
												<Button color="primary" className="px-4" onClick={this.handleSubmit}>Login</Button>
											</Col>
											<Col xs="6" className="text-danger">
												{this.state.loginError}
											</Col>
										</Row>
									</Form>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default Login;
