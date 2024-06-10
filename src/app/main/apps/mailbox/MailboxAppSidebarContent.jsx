import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import FuseNavigation from '@fuse/core/FuseNavigation';
import FuseNavItemModel from '@fuse/core/FuseNavigation/models/FuseNavItemModel';
import MailCompose from './MailCompose';
import { useEffect, useState } from 'react';

/**
 * The mailbox app sidebar content.
 */
function MailboxAppSidebarContent() {
	const [folders, setFolders] = useState([
    {
        "id": "7c004a19-4506-48ef-93ab-f16381302e3b",
        "title": "Inbox",
        "slug": "inbox",
        "icon": "heroicons-outline:inbox"
    },
    {
        "id": "1ee2ea29-9a1f-4c27-b4d2-5e465703b6a0",
        "title": "Sent",
        "slug": "sent",
        "icon": "heroicons-outline:paper-airplane"
    },
    {
        "id": "fbdc8e79-a0c4-4a27-bc98-9c81ee7a86e5",
        "title": "Drafts",
        "slug": "drafts",
        "icon": "heroicons-outline:document"
    },
    {
        "id": "0197c436-2ef3-424d-b546-8b7f49186e15",
        "title": "Spam",
        "slug": "spam",
        "icon": "heroicons-outline:exclamation"
    },
    {
        "id": "2fa74637-d362-4fd2-9a88-f7195a88bdde",
        "title": "Trash",
        "slug": "trash",
        "icon": "heroicons-outline:trash"
    }
]);
	const [labels, setLabels ] = useState([
    {
        "id": "b167d3c4-f6ed-4ea6-9579-a12f95a9d76e",
        "title": "Personal",
        "slug": "personal",
        "color": "blue"
    },
    {
        "id": "745cf30e-ca84-47a1-a553-b70eb630d8e7",
        "title": "Work",
        "slug": "work",
        "color": "indigo"
    },
    {
        "id": "8b035cb5-65c0-4ab1-bb4c-43b0e442d1f3",
        "title": "Payments",
        "slug": "payments",
        "color": "red"
    },
    {
        "id": "b2d1e4e7-7cfd-4b51-ae59-217a093df754",
        "title": "Invoices",
        "slug": "invoices",
        "color": "teal"
    },
    {
        "id": "184cd689-4ee4-47cf-9f8a-12233d614326",
        "title": "Accounts",
        "slug": "accounts",
        "color": "purple"
    },
    {
        "id": "b67fc437-6118-4ec8-a3c7-9320b828e3fc",
        "title": "Forums",
        "slug": "forums",
        "color": "green"
    }
]);
	const [filters, setFilters ] = useState([
    {
        "id": "de1b41f6-6839-4f1b-9d2c-07e55f6f8f82",
        "title": "Starred",
        "slug": "starred",
        "icon": "heroicons-outline:star"
    },
    {
        "id": "71bba1ec-a90e-4a71-9932-4bab0a99aa1c",
        "title": "Important",
        "slug": "important",
        "icon": "heroicons-outline:exclamation-circle"
    }
]);
	const { t } = useTranslation('mailboxApp');

	return (
		<div className="flex-auto border-l-1">
			<div className="mb-24 mt-40 mx-24">
				<motion.div
					initial={{ x: 20, opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
				>
					<Typography className="text-4xl font-extrabold tracking-tight leading-none">Mailbox</Typography>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { delay: 0.1 } }}
				>
					<MailCompose className="mt-32" />
				</motion.div>
			</div>

			<motion.div
				className="mb-24"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
			>
				<Typography
					className="px-28 py-10 uppercase text-12 font-600"
					color="secondary.main"
				>
					{t('FOLDERS')}
				</Typography>

				<FuseNavigation
					navigation={folders?.map((item) => ({
						...item,
						type: 'item',
						url: `/apps/mailbox/${item.slug}`
					}))}
				/>
			</motion.div>

			<motion.div
				className="mb-24"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
			>
				<Typography
					className="px-28 py-10 uppercase text-12 font-600"
					color="secondary.main"
				>
					{t('FILTERS')}
				</Typography>

				<FuseNavigation
					navigation={filters?.map((item) => ({
						...item,
						type: 'item',
						url: `/apps/mailbox/filter/${item.slug}`
					}))}
				/>
			</motion.div>

			<motion.div
				className="mb-24"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
			>
				<Typography
					className="px-28 py-10 uppercase text-12 font-600"
					color="secondary.main"
				>
					{t('LABELS')}
				</Typography>

				<FuseNavigation
					navigation={labels?.map((item) =>
						FuseNavItemModel({
							...item,
							type: 'item',
							url: `/apps/mailbox/label/${item.slug}`,
							icon: 'heroicons-outline:tag',
							sx: {
								'& > .fuse-list-item-icon': {
									color: `${item.color}!important`,
									opacity: 0.6
								}
							}
						})
					)}
				/>
			</motion.div>
		</div>
	);
}

export default MailboxAppSidebarContent;
