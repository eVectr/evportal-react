import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard/SuperAdmin'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const SupportTickets = React.lazy(() => import('./views/Support/Tickets'));
const TicketDetails = React.lazy(() => import('./views/Support/TicketDetails'));
const Agents = React.lazy(() => import('./views/Support/Agents'));
const routes = [
	{ path: '/', exact: true, name: 'Home' },
	{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
	{ path: '/users', exact: true,  name: 'Users', component: Users },
	{ path: '/users/:id', exact: true, name: 'User Details', component: User },
	{ path: '/support/tickets', name: 'Support Tickets', component: SupportTickets },
	{ path: '/support/ticket/:id', exact: true, name: 'TicketDetails', component: TicketDetails },
	{ path: '/support/agents', name: 'Support Agents', component: Agents },
];

export default routes;