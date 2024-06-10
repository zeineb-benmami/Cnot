import i18next from 'i18next';
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import BourseAdd from './BourseAdd';


const BourseApp = lazy(() => import('./BourseApp'));
const Bourse = lazy(()=>import('./Bourse'));
const BourseDetails = lazy(() => import('./BourseDetails'));
/**
 * The mailbox app config.
 */
const BourseAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/',
			element: <BourseApp />,
			children: [
				{
					path: '',
					element: <Navigate to="/apps/bourses" />
				},
				{
					path: 'bourses/:bourseId',
					element: <BourseDetails />
				},
				{
					path: 'bourses/add',
					element: <BourseAdd />
				},
				{
					path: 'bourses',
					element: <Bourse />
				}
			]
		}
	]
};
export default BourseAppConfig;
