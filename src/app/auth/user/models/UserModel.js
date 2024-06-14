import jwtDecode from 'jwt-decode';
import _ from 'lodash';

/**
 * Decodes the JWT from local storage and returns user data.
 * @returns {object} The user data if the token exists and is valid, otherwise defaults.
 */

// Base URL for the image path

/**
 * Decodes the JWT from local storage and returns user data.
 */
function decodeToken() {
    const token = localStorage.getItem('jwt_access_token');
    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

/**
 * Converts the relative image path from the token to a full URL, including 'public'.
 */


/**
 * Creates a new user object with the specified data from JWT.
 */
function UserModel() {
    const decodedToken = decodeToken();

    if (!decodedToken) {
        return {
            uid: '',
            role: '',
            data: {
                displayName: 'Guest User',
                photoURL: `/path/to/default/photo.jpg`,
                email: '',
                shortcuts: [],
                settings: {}
            }
        };
    }

    return {
        uid: decodedToken.userId || '',
        role: decodedToken.role || '',
        data: {
            displayName: decodedToken.name || 'Guest User',
            photoURL:`/path/to/default/photo.jpg` ,
            email: decodedToken.email || '',
            shortcuts: [],
            settings: {}
        }
    };
}

export default UserModel;
