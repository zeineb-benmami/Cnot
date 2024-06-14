import { Component } from 'react';
import { matchRoutes } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import AppContext from 'app/AppContext';
import withRouter from '@fuse/core/withRouter';
import history from '@history';
import {
	getSessionRedirectUrl,
	resetSessionRedirectUrl,
	setSessionRedirectUrl
} from '@fuse/core/FuseAuthorization/sessionRedirectUrl';
import FuseLoading from '@fuse/core/FuseLoading';

function isUserGuest(role) {
    // This should return `false` if the role includes 'admin'
    return !role || role.length === 0 || role.includes('guest');
}


/**
 * FuseAuthorization is a higher-order component that wraps its child component which handles the authorization logic of the app.
 * It checks the provided Auth property from FuseRouteItemType (auth property) against the current logged-in user role.
 */
class FuseAuthorization extends Component {
	constructor(props, context) {
		super(props);
		const { routes } = context;
		this.state = {
			accessGranted: true,
			routes
		};
	}

	componentDidMount() {
		const { accessGranted } = this.state;

		if (!accessGranted) {
			this.redirectRoute();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { accessGranted } = this.state;
		return nextState.accessGranted !== accessGranted;
	}

	componentDidUpdate() {
		const { accessGranted } = this.state;

		if (!accessGranted) {
			this.redirectRoute();
		}
	}

	static getDerivedStateFromProps(props, state) {
		console.log("Current user role:", props.userRole);
		const { location, userRole } = props;
		const { pathname } = location;
		const matchedRoutes = matchRoutes(state.routes, pathname);
		const matched = matchedRoutes ? matchedRoutes[0] : false;
	
		if (!matched) {
			return { accessGranted: true };
		}
	
		const { route } = matched;
		const userHasPermission = FuseUtils.hasPermission(route.auth, userRole);
		const ignoredPaths = ['/', '/callback', '/sign-in', '/sign-out', '/logout', '/404'];
	
		if (matched && !userHasPermission && !ignoredPaths.includes(pathname)) {
			setSessionRedirectUrl(pathname);
		}
	
		// Adjust logic here to ensure it correctly checks for the admin role
		if (!userHasPermission && !isUserGuest(userRole) && !ignoredPaths.includes(pathname)) {
			setSessionRedirectUrl('/');
		}
	
		return {
			accessGranted: userHasPermission
		};
	}
	

	redirectRoute() {
		const { userRole, loginRedirectUrl = '/' } = this.props;
		const redirectUrl = getSessionRedirectUrl() || loginRedirectUrl;

		/*
        User is guest
        Redirect to Login Page
        */
		if (isUserGuest(userRole)) {
			setTimeout(() => history.push('/sign-in'), 0);
		} else {
			/*
          User is member
          User must be on unAuthorized page or just logged in
          Redirect to dashboard or loginRedirectUrl
            */
			setTimeout(() => history.push(redirectUrl), 0);
			resetSessionRedirectUrl();
		}
	}

	render() {
		const { accessGranted } = this.state;
		const { children } = this.props;
		return accessGranted ? children : <FuseLoading />;
	}
}
FuseAuthorization.contextType = AppContext;
export default withRouter(FuseAuthorization);
