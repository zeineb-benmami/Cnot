import FuseUtils from '@fuse/utils';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import withRouter from '@fuse/core/withRouter';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useAppSelector } from 'app/store/hooks';
import MailListItem from './MailListItem';
import { selectSearchText } from '../mailboxAppSlice';
import { getEmails } from 'src/services/mailService';

/**
 * The mail list.
 */
function MailList() {
	const routeParams = useParams();
	const searchText = useAppSelector(selectSearchText);
	const [mails, setMails] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const { t } = useTranslation('mailboxApp');
	const [account, setAccount] = useState({ mailaddress: "cnotperform@outlook.com", password: "123@Cnot" });

	const getFilteredArray = (mails) => {
		if (!mails) return [];
		if (!searchText) return mails;
		return FuseUtils.filterArrayByString(mails, searchText);
	};

	const fetchEmails = async (account) => {
		try {
			const result = await getEmails(account);
			const data = result.data;
			setMails(data.reverse());
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchEmails(account);
	}, [account]);

	useEffect(() => {
		setFilteredData(getFilteredArray(mails));
	}, [mails, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center p-24"
			>
				<FuseSvgIcon
					className="icon-size-128 mb-16"
					color="disabled"
					size={24}
				>
					heroicons-outline:mail-open
				</FuseSvgIcon>
				<Typography
					className="mt-16 text-2xl font-semibold tracking-tight"
					color="text.secondary"
				>
					{t('NO_MESSAGES')}
				</Typography>
			</motion.div>
		);
	}

	return (
		<List className="p-0 w-full">
			{filteredData.map((mail) => (
				<MailListItem
					mail={mail}
					key={mail._id}
				/>
			))}
		</List>
	);
}

export default withRouter(MailList);
