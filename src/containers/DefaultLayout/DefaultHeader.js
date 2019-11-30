import React, { Component } from 'react';
//import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/header-logo.png'
import sygnet from '../../assets/img/brand/header-logo.png'


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
				full={{ src: logo, width: 30, height: 25, alt: 'eVectr Logo' }}
				minimized={{ src: sygnet, width: 30, height: 25, alt: 'eVectr Logo' }}
				/>
				<AppSidebarToggler className="d-md-down-none" display="lg" />

				<Nav className="d-md-down-none" navbar>
				<NavItem className="px-3">
					EV Portal
				</NavItem>
				{/*<NavItem className="px-3">
					<NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
				</NavItem>
				<NavItem className="px-3">
					<NavLink to="#" className="nav-link">Settings</NavLink>
			</NavItem>*/}
				</Nav>
				<Nav className="ml-auto" navbar>
				<UncontrolledDropdown nav direction="down">
					<DropdownToggle nav style={{marginRight: "20px"}}> 
					<i className="fa fa-user text-success"></i> Ben Ashton
					</DropdownToggle>
					<DropdownMenu right>
					<DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
					<DropdownItem><i className="nav-icon fa fa-circle text-success" style={{marginRight: "20px"}}></i> Available</DropdownItem>
					<DropdownItem><i className="fa fa-tasks"></i> Tickets<Badge color="danger">2</Badge></DropdownItem>
					<DropdownItem divider />
					<DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
				</Nav>
				{/*<AppAsideToggler className="d-lg-none" mobile />*/}
			</React.Fragment>
		);
	}
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
