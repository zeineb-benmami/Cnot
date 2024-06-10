import React, { useEffect, useState } from 'react'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useParams } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import _ from '@lodash';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import ProductHeader from './ProductHeader';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import BasicInfoTab from './tabs/BasicInfoTab';
import ProductImagesTab from './tabs/ProductImagesTab';
import PricingTab from './tabs/PricingTab';
import InventoryTab from './tabs/InventoryTab';
import ShippingTab from './tabs/ShippingTab';



const schema = z.object({
    titre: z.string()
      .nonempty('Le titre est obligatoire')
      .min(2, 'Le titre doit comporter au moins 2 caractères'),
    montant: z.number()
      .min(1, 'Le montant doit être supérieur à 0')
      .nonnegative('Le montant doit être supérieur à 0')
      .refine(val => val > 0, 'Le montant est obligatoire'),
    federation: z.string()
      .nonempty('La fédération est obligatoire'),
    domaine: z.string()
      .nonempty('Le domaine est obligatoire'),
    groupe: z.string()
      .nonempty('Le groupe est obligatoire'),
    description: z.string()
      .nonempty('La description est obligatoire')
      .min(10, 'La description doit comporter au moins 10 caractères'),
  });

function BourseAdd() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { productId } = routeParams;
    const [product, setProduct] = useState(null);
	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (productId === 'new') {
			reset(ProductModel({}));
		}
	}, [productId, reset]);
	useEffect(() => {
		if (product) {
			reset({ ...product });
		}
	}, [product, reset]);

	/**
	 * Tab Change
	 */
	function handleTabChange(event, value) {
		setTabValue(value);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<ProductHeader />}
				content={
					<>
						<Tabs
							value={tabValue}
							onChange={handleTabChange}
							indicatorColor="secondary"
							textColor="secondary"
							variant="scrollable"
							scrollButtons="auto"
							classes={{ root: 'w-full h-64 border-b-1' }}
						>
							<Tab
								className="h-64"
								label="Bourse Info"
							/>
							<Tab
								className="h-64"
								label="Fichier Demandées"
							/>
							{/*<Tab
								className="h-64"
								label="Pricing"
							/>
							<Tab
								className="h-64"
								label="Inventory"
							/>
							<Tab
								className="h-64"
								label="Shipping"
							/>*/}
						</Tabs>
						<div className="p-16 sm:p-24 max-w-3xl">
							<div className={tabValue !== 0 ? 'hidden' : ''}>
								<BasicInfoTab />
							</div>

							<div className={tabValue !== 1 ? 'hidden' : ''}>
								<ProductImagesTab />
							</div>

							{/*<div className={tabValue !== 2 ? 'hidden' : ''}>
								<PricingTab />
							</div>

							<div className={tabValue !== 3 ? 'hidden' : ''}>
								<InventoryTab />
							</div>

							<div className={tabValue !== 4 ? 'hidden' : ''}>
								<ShippingTab />
							</div>*/}
						</div>
					</>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default BourseAdd