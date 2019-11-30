/* NEED TO CONVERT THIS TO REACT CONTEXT */
import React, { Component } from 'react';
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_SOCKET_URL);

function SocketConnect(callback) {
	if(localStorage.getItem("token") !== null && localStorage.getItem("roles") !== null) {
		var token = localStorage.getItem("token");
		console.log("Authenticating socket...");
		socket.on('connect', (error, result) => {
			socket.emit('authentication', {token: token});
			socket.on('authenticated', () => {
				// use the socket as usual
				console.log('Socket Authenticated.');
				socket.on('connectedUsers', connectedUsers => callback(null, connectedUsers));
				//socket.emit('connectedUsers', 5000);
			});
		});
	} else {
		console.log("no token for socket");
	}
} export { SocketConnect };