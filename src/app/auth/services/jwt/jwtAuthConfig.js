const jwtAuthConfig = {
	tokenStorageKey: 'jwt_access_token',
	signInUrl: 'http://localhost:3001/users/signin',
	signUpUrl: 'mock-api/auth/sign-up',
	tokenRefreshUrl: 'mock-api/auth/refresh',
	getUserUrl: 'mock-api/auth/user',
	updateUserUrl: 'mock-api/auth/user',
	updateTokenFromHeader: true
};
export default jwtAuthConfig;
