import React, { Component } from 'react';
//import { Link, NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/header-logo.png'
import sygnet from '../../assets/img/brand/header-logo.png'
import WhoIsOnline from '../../Sockets/WhoIsOnline.js';

const propTypes = {
	children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
	render() {
		return (
			<React.Fragment>
				<AppSidebarToggler className="d-lg-none" display="md" mobile />
				<AppNavbarBrand
					full={{ src: logo, width: 30, height: 30, alt: 'eVectr Logo' }}
					minimized={{ src: sygnet, width: 30, height: 30, alt: 'eVectr Logo' }}
				/>
				<AppSidebarToggler className="d-md-down-none" display="lg" />

				<Nav className="d-md-down-none" navbar>
				<NavItem className="px-3">
					EV Portal
				</NavItem>
				</Nav>
				<WhoIsOnline />
				{/*<AppAsideToggler className="d-lg-none" mobile />*/}
			</React.Fragment>
		);
	}
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
