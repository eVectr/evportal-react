import React, { useState } from 'react';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_SOCKET_URL);

function WhoIsOnline() {
	const [connectedUsers, setConnectedUsers] = useState([]);
	const [myStatusClass, setStatusClass] = useState("fa fa-user");
	const connectedUsersList = connectedUsers.map((user) => <DropdownItem key={user.SocketID}><i className="nav-icon fa fa-circle text-success" style={{marginRight: "20px"}}></i> {user.displayName}</DropdownItem>);
	
	if(localStorage.getItem("token") !== null && localStorage.getItem("roles") !== null) {
		var token = localStorage.getItem("token");
			console.log("Authenticating socket...");
			var socketEventsAttached = false;
			if(!socketEventsAttached) {
				socket.on('connect', (error, result) => {
					socket.emit('authentication', { token: token });
					socket.on('authenticated', () => {
						// Socket is authenticated
						console.log('Socket Authenticated.');
						socketEventsAttached = true;
						setStatusClass("fa fa-user text-success");
						socket.on("device connected", (docs) => {
							console.log('device connected');
							setConnectedUsers(docs);
						});
						socket.on("device disconnected", (docs) => {
							console.log('device disconnected');
							setStatusClass("fa fa-user");
							setConnectedUsers(docs);
						});
					});
				});
			}
			
			
		//useEffect(() => {});

		return (
			<Nav className="ml-auto" navbar>
				<UncontrolledDropdown nav direction="down">
					<DropdownToggle nav style={{marginRight: "20px"}}> 
						<i className={myStatusClass}></i> Users
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem header tag="div" className="text-center"><strong>Available</strong></DropdownItem>
						{connectedUsersList}
						<DropdownItem divider />
						<DropdownItem><i className="fa fa-tasks"></i> Tickets<Badge color="danger">2</Badge></DropdownItem>
						<DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</Nav>
		);
	}
} export default WhoIsOnline;