import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import clsx from 'clsx';
import BourseCategory from './BourseCategory';
import { useEffect, useState } from 'react';

/**
 * The CourseInfo component.
 */
function BourseInfo(props) {
	const { bourse, className } = props;
	const [documents, setDocuments] = useState([]);
	useEffect(() => {
		setDocuments(bourse.liste_documents);
	},[])

	if (!bourse) {
		return null;
	}
	console.log(documents);

	return (
		<div className={clsx('w-full', className)}>
			<div className="flex items-center justify-between mb-16">
				<BourseCategory groupe={bourse.groupe} domaine={bourse.domaine} />

				{bourse.status == 'acceptee' && (
					<FuseSvgIcon
						className="text-green-600"
						size={20}
					>
						heroicons-solid:badge-check
					</FuseSvgIcon>
				)}
			</div>

			<Typography className="text-16 font-medium">{bourse.titre}</Typography>

			<Typography
				className="text-13 mt-2 line-clamp-2"
				color="text.secondary"
			>
				{bourse.description}
			</Typography>

			<Divider
				className="w-48 my-24 border-1"
				light
			/>

			<Typography
				className="flex items-center space-x-6 text-13"
				color="text.secondary"
			>
				<FuseSvgIcon
					color="#0369A1"
					size={20}
				>
					heroicons-outline:currency-dollar
				</FuseSvgIcon>
				<span className="whitespace-nowrap leading-none text-blue-600 font-bold">{`${bourse.montant} TND`}</span>
			</Typography>
			{documents.map((d, index) => (
				<Typography
					key={index}
					className="flex items-center space-x-6 text-13 mt-8"
					color="text.secondary"
				>
					<FuseSvgIcon
					color="disabled"
					size={20}
					>
					heroicons-solid:paper-clip
					</FuseSvgIcon>
					<span className="whitespace-nowrap leading-none">
					{d.nom}   
					</span>
					{d.path === '' ? (
											<FuseSvgIcon
											color="yellow"
											size={20}
											>
											heroicons-solid:clock
											</FuseSvgIcon>
					):(
						<FuseSvgIcon
						color="green"
						size={20}
						>
						heroicons-solid:check
						</FuseSvgIcon>
					)}
				</Typography>
				))}

		</div>
	);
}

export default BourseInfo;
