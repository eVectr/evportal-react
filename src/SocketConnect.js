/* NEED TO CONVERT THIS TO REACT CONTEXT */
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_SOCKET_URL);
if(localStorage.getItem("token") !== null && localStorage.getItem("roles") !== null) {
	var token = localStorage.getItem("token");
	console.log("Authenticating socket...");
	socket.on('connect', (error, result) => {
		socket.emit('authentication', { token: token });
		socket.on('authenticated', () => {
			// use the socket as usual
			console.log('Socket Authenticated.');
			
			//this.setState({connectedUsers: connectedUsers});
			//return socket;
			//socket.on('connectedUsers', connectedUsers => (null, connectedUsers));
			
			//socket.emit('connectedUsers', 5000);
		});
	});
} else {
	console.log("no token for socket");
}

export { socket };