import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
	AppFooter,
	AppHeader,
	AppSidebar,
	AppSidebarFooter,
	AppSidebarForm,
	AppSidebarHeader,
	AppSidebarMinimizer,
	AppBreadcrumb2 as AppBreadcrumb,
	AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import super_admin_nav from '../../super_admin_nav';
// routes config
import routes from '../../routes';
import api_url from '../../config.js';

//const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

	constructor(props) {
		super(props);
		this.state = {
			authData: "loading",
			roles: [],
			apiUnavailable: false,
		};
	}

	componentDidMount() {
		if(localStorage.getItem("token") !== null && localStorage.getItem("roles") !== null) {
			fetch(api_url+'/auth/check', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'x-access-token': localStorage.getItem('token')
				},
			}).then(results => results.json()).then(data => {
				if(data.status===503) {
					this.setState({
						apiUnavailable: true
					});
					return false;
				}
				if(data.auth===false) {
					localStorage.removeItem("token");
					this.setState({
						authData: false
					});
				}  else if (data.auth===true) {
					this.setState({
						authData: JSON.parse(data.auth),
						roles: JSON.parse(data.roles)
					});
				} else {
					this.setState({
						authData: false
					});
				}
			});
		} else {
			this.setState({
				authData: false
			});
		}
	}

	loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

	signOut(e) {
		e.preventDefault();
		localStorage.removeItem("token");
		this.props.history.push('/login');
	}

	render() {
		if(this.state.authData === true) {
			return (
				<div className="app">
					<AppHeader fixed>
						<Suspense  fallback={this.loading()}>
							<DefaultHeader onLogout={e=>this.signOut(e)}/>
						</Suspense>
					</AppHeader>
					<div className="app-body">
						<AppSidebar fixed display="lg">
							<AppSidebarHeader />
							<AppSidebarForm />
							<Suspense>
								<AppSidebarNav navConfig={super_admin_nav} {...this.props} router={router}/>
							</Suspense>
							<AppSidebarFooter />
							<AppSidebarMinimizer />
						</AppSidebar>
						<main className="main">
							<AppBreadcrumb appRoutes={routes} router={router}/>
							<Container fluid>
								<Suspense fallback={this.loading()}>
									<Switch>
										{routes.map((route, idx) => {
											return route.component ? (
												<Route
													key={idx}
													path={route.path}
													exact={route.exact}
													name={route.name}
													render={props => (
														<route.component {...props} />
													)} />
											) : (null);
										})}
										<Redirect from="/" to="/dashboard" />
									</Switch>
								</Suspense>
							</Container>
						</main>
						
					</div>
					<AppFooter>
						<Suspense fallback={this.loading()}>
							<DefaultFooter />
						</Suspense>
					</AppFooter>
				</div>
			);
		}

		if(this.state.authData === "loading") {
			return (
				<div className="animated fadeIn pt-1 text-center">Attempting to connect to portal...</div>
			)
		}
		
		if(this.state.authData === false) {
			return (
				<Redirect from="/" to="/login" />
			)
		}
	}
}

export default DefaultLayout;
