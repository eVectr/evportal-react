/*

	EVPortal
	WhoIsOnline - Function Component
	Displays a Nav Menu with the currently connected socket clients as Users Online

*/

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_SOCKET_URL);

function WhoIsOnline() {
	const [ connectedUsers, setConnectedUsers ] = useState([]);
	const [ myStatusClass, setStatusClass ] = useState("fa fa-user");
	//const connectedUsersList = Object.keys(connectedUsers).map((key, userObj) => <DropdownItem key={key}><i className="nav-icon fa fa-circle text-success" style={{marginRight: "20px"}}></i> {key.displayName}</DropdownItem>);
	//const connectedUsersList = JSON.parse()
	const connectedUsersList = Object.keys(connectedUsers).map((user_id) => <DropdownItem key={user_id}><i className="nav-icon fa fa-circle text-success" style={{marginRight: "20px"}}></i> {connectedUsers[user_id].displayName}</DropdownItem>);
	const [ isLogout, setIsLogout ] = useState(false);

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
							console.log(docs);
							setConnectedUsers(docs);
						});
						socket.on("device disconnected", (docs) => {
							console.log('device disconnected');
							//setStatusClass("fa fa-user");
							//setConnectedUsers(JSON.parse(docs));
						});
					});
				});
			}
			
			
		//useEffect(() => {});
		
		return (
			<Nav className="ml-auto" navbar>
				<UncontrolledDropdown nav direction="down">
					<DropdownToggle nav style={{marginRight: "20px"}}> 
						<i className="fa fa-envelope"></i>
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem header tag="div" className="text-center"><strong>Notifications</strong></DropdownItem>
						<DropdownItem divider />
						<DropdownItem><i className="fa fa-envelope"></i> Messages<Badge color="danger">2</Badge></DropdownItem>
						
					</DropdownMenu>
				</UncontrolledDropdown>
				<UncontrolledDropdown nav direction="down">
					<DropdownToggle nav style={{marginRight: "20px"}}> 
						<i className={myStatusClass}></i> People
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem header tag="div" className="text-center"><strong>Available</strong></DropdownItem>
						{connectedUsersList}
						<DropdownItem divider />
						<DropdownItem><i className="fa fa-tasks"></i> Tickets<Badge color="danger">2</Badge></DropdownItem>
						<DropdownItem onClick={(event)=>{
							localStorage.removeItem("token");
							socket.close();
							setIsLogout(true);
							//this.props.history.push('/login');
						}}><i className="fa fa-lock"></i> Logout</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</Nav>
		);
	}
} export default WhoIsOnline;