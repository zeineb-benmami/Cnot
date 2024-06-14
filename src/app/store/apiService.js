import { createApi } from '@reduxjs/toolkit/query/react';
import Axios from 'axios';

const axiosBaseQuery =
	() =>
	async ({ url, method, data, params }) => {
		try {
			Axios.defaults.baseURL = '/api';
			const result = await Axios({
				url,
				method,
				data,
				params,
			});
			return { data: result.data };
		} catch (axiosError) {
			const error = axiosError;
			const serializedError = {
				message: error.message,
				name: error.name,
				stack: error.stack,
				status: error.response ? error.response.status : null,
				data: error.response ? error.response.data : null,
			};
			return {
				error: serializedError,
			};
		}
	};

export const apiService = createApi({
	baseQuery: axiosBaseQuery(),
	endpoints: (builder) => ({
		getMessengerContacts: builder.query({
			query: () => ({
				url: '/contacts',
				method: 'GET',
			}),
		}),
		getMessengerUserProfile: builder.query({
			query: () => ({
				url: '/user-profile',
				method: 'GET',
			}),
		}),
		getMessengerChats: builder.query({
			query: () => ({
				url: '/chats',
				method: 'GET',
			}),
		}),
	}),
	reducerPath: 'apiService',
});

export const { useGetMessengerContactsQuery, useGetMessengerUserProfileQuery, useGetMessengerChatsQuery } = apiService;
export default apiService;
