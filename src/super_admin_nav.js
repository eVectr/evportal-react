export default {
	items:
	[
		{
			name: 'Dashboard',
			url: '/dashboard',
			icon: 'icon-speedometer',
			badge: {
				variant: 'info',
				//text: 'NEW',
			},
		},
		{
			title: true,
			name: 'Admin',
			wrapper: {            // optional wrapper object
			element: '',        // required valid HTML5 element tag
			attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
			},
			class: ''             // optional class names space delimited list for title item ex: "text-center"
		},
		{
			name: 'Account Management',
			url: '/users',
			icon: 'icon-user',
		},
		{
			title: true,
			name: 'Support Manager',
			wrapper: {            // optional wrapper object
			element: '',        // required valid HTML5 element tag
			attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
			},
			class: ''             // optional class names space delimited list for title item ex: "text-center"
		},
		{
			name: 'Support Agents',
			url: '/support/agents',
			icon: 'icon-people',
		},
		{
			title: true,
			name: 'Support',
			wrapper: {            // optional wrapper object
			element: '',        // required valid HTML5 element tag
			attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
			},
			class: ''             // optional class names space delimited list for title item ex: "text-center"
		},
		{
			name: 'Support Tickets',
			url: '/support/tickets',
			icon: 'icon-note',
		},
	],
};