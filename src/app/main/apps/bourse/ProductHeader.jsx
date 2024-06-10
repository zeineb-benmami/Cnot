import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import _ from '@lodash';
import { addBourse } from 'src/services/bourseService';


function ProductHeader() {
	const routeParams = useParams();
	const { productId } = routeParams;
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();

    useEffect(() => {
        // Log all form data as an object after the component mounts
        console.log("Initial Form Data:", getValues().groupe);
		console.log(isValid);
    }, [getValues()]);

	async function handleSaveProduct() {
		await addBourse(getValues);
	}

	function handleCreateProduct() {

	}

	function handleRemoveProduct() {
		navigate('/apps/e-commerce/products');
	}

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
			<div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
				<motion.div
					initial={{ x: 20, opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
				>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/apps/e-commerce/products"
						color="inherit"
					>
						<FuseSvgIcon size={20}>
							{theme.direction === 'ltr'
								? 'heroicons-outline:arrow-sm-left'
								: 'heroicons-outline:arrow-sm-right'}
						</FuseSvgIcon>
						<span className="flex mx-4 font-medium">Bourses</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="hidden sm:flex"
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.3 } }}
					>
						{!getValues().groupe && (
							<img
								className="w-32 sm:w-48 rounded"
								src="assets/images/apps/ecommerce/product-image-placeholder.png"
								alt={name}
							/>
						)}
						{getValues().groupe === 'universalite' && (
							<img
								className="w-32 sm:w-48 rounded"
								src="assets/images/bourses/universalite.png"
								alt={name}
							/>
						)}
						{getValues().groupe === 'entourage' && (
							<img
								className="w-32 sm:w-48 rounded"
								src="assets/images/bourses/entourage.png"
								alt={name}
							/>
						)}
						{getValues().groupe === 'developpement' && (
							<img
								className="w-32 sm:w-48 rounded"
								src="assets/images/bourses/developement.png"
								alt={name}
							/>
						)}
						{getValues().groupe === 'valeurs' && (
							<img
								className="w-32 sm:w-48 rounded"
								src="assets/images/bourses/valeurs.png"
								alt={name}
							/>
						)}
						{getValues().groupe === 'capciteadministration' && (
							<img
								className="w-32 sm:w-48 rounded"
								src="assets/images/bourses/administration.png"
								alt={name}
							/>
						)}

					</motion.div>
					<motion.div
						className="flex flex-col min-w-0 mx-8 sm:mx-16"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-16 sm:text-20 truncate font-semibold">
							{name || 'Nouvelle bourse'}
						</Typography>
						<Typography
							variant="caption"
							className="font-medium"
						>
							Détails de la bourse
						</Typography>
					</motion.div>
				</div>
			</div>
			<motion.div
				className="flex flex-1 w-full"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
			<Button
				className="whitespace-nowrap mx-4"
				variant="contained"
				color="secondary"
				onClick={handleSaveProduct}
				>
					Ajouter
				</Button>
			</motion.div>
		</div>
	);
}

export default ProductHeader