import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useMemo, useState,useEffect  } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import InputAdornment from '@mui/material/InputAdornment';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { OutlinedInput } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import { useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from '@lodash';
import MailListTitle from './MailListTitle';
import { getEmails } from 'src/services/mailService';
import {
	useApplyMailboxMailActionMutation,
	useGetMailboxFoldersQuery,
	useGetMailboxLabelsQuery,
	useGetMailboxMailsQuery
} from '../MailboxApi';
import {
	selectSearchText,
	setSearchText,
	deselectAllMails,
	selectSelectedMailIds,
	setSelectedMailIds
} from '../mailboxAppSlice';

/**
 * The mail toolbar.
 */
function MailToolbar(props) {
	const { onToggleLeftSidebar } = props;
	const dispatch = useAppDispatch();
	const routeParams = useParams();
	const [mails, setMails] = useState([]);
	const [account, setAccount] = useState({ mailaddress: "cnotperform@outlook.com", password: "123@Cnot" });
	const mailIds = mails?.map((mail) => mail.id);
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
	const [setActionToMails] = useApplyMailboxMailActionMutation();
	const searchText = useAppSelector(selectSearchText);
	const { t } = useTranslation('mailboxApp');
	const selectedMailIds = useAppSelector(selectSelectedMailIds);
	const trashFolderId = useMemo(() => _.find(folders, { slug: 'trash' })?.id, [folders]);
	const defaultMenuState = {
		select: null,
		folders: null,
		labels: null
	};
	const [menu, setMenu] = useState(defaultMenuState);

	const fetchEmails = async (account) => {
		try {
			const result = await getEmails(account);
			const data = result.data;
			setMails(data.reverse());
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(()=>{
		fetchEmails(account);
		console.log(mails)
	},[])

	function handleMenuOpen(event, _menu) {
		setMenu({
			...menu,
			[_menu]: event.currentTarget
		});
	}

	function handleMenuClose() {
		setMenu(defaultMenuState);
	}

	function handleCheckChange(event) {
		return event.target.checked ? handleSelectAll() : handleDeselectAll();
	}

	function handleSelectAll() {
		dispatch(setSelectedMailIds(mailIds));
		handleMenuClose();
	}

	function handleDeselectAll() {
		dispatch(deselectAllMails());
		handleMenuClose();
	}

	function handleSelectByParameter(parameter, value) {
		const selectedMails = mails.filter((mail) => {
			const entityParameter = mail[parameter];
			return entityParameter ? entityParameter === value : false;
		});
		const newMailIds = selectedMails.map((mail) => mail._id);
		dispatch(setSelectedMailIds(newMailIds));
		handleMenuClose();
	}

	/*if (isMailsLoading || isFoldersLoading || isLabelsLoading) {
		return <FuseLoading />;
	}*/

	return (
		<div className="sticky top-0 z-10">
			<Box
				sx={{ backgroundColor: 'background.default' }}
				className="flex items-center w-full min-h-64 py-12 sm:py-0 space-x-8 px-8 border-b "
			>
				<div className="flex items-center">
					<Hidden lgUp>
						<IconButton
							onClick={() => onToggleLeftSidebar()}
							aria-label="open left sidebar"
							size="small"
						>
							<FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
						</IconButton>
					</Hidden>

					<MailListTitle />
				</div>

				<OutlinedInput
					className="flex flex-1 items-center px-16 rounded-full"
					fullWidth
					placeholder={t('SEARCH_PLACEHOLDER')}
					value={searchText}
					onChange={(ev) => dispatch(setSearchText(ev))}
					startAdornment={
						<InputAdornment position="start">
							<FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>
						</InputAdornment>
					}
					inputProps={{
						'aria-label': 'Search'
					}}
					size="small"
				/>
			</Box>

			<Box
				className="flex items-center w-full min-h-56 px-8 border-b space-x-8"
				sx={{ backgroundColor: 'background.paper' }}
			>
				<Checkbox
					onChange={handleCheckChange}
					checked={selectedMailIds?.length === mails?.length && selectedMailIds?.length > 0}
					indeterminate={selectedMailIds?.length !== mails?.length && selectedMailIds?.length > 0}
					size="small"
				/>

				<IconButton
					size="small"
					aria-label="More"
					aria-haspopup="true"
					onClick={(ev) => handleMenuOpen(ev, 'select')}
				>
					<FuseSvgIcon size={16}>heroicons-outline:chevron-down</FuseSvgIcon>
				</IconButton>

				<Menu
					id="select-menu"
					anchorEl={menu.select}
					open={Boolean(menu.select)}
					onClose={handleMenuClose}
				>
					<MenuItem onClick={handleSelectAll}>All</MenuItem>
					<MenuItem onClick={handleDeselectAll}>None</MenuItem>
					<MenuItem
						onClick={() => {
							handleSelectByParameter('unread', false);
						}}
					>
						Read
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleSelectByParameter('unread', true);
						}}
					>
						Unread
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleSelectByParameter('starred', true);
						}}
					>
						Starred
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleSelectByParameter('starred', false);
						}}
					>
						Unstarred
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleSelectByParameter('important', true);
						}}
					>
						Important
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleSelectByParameter('important', false);
						}}
					>
						Unimportant
					</MenuItem>
				</Menu>

				{selectedMailIds.length > 0 && (
					<>
						<div className="border-r-1 h-32 w-1 mx-12 my-0" />

						<Tooltip title="Delete">
							<IconButton
								onClick={() => {
									setActionToMails({
										type: 'folder',
										value: trashFolderId,
										ids: selectedMailIds
									});
								}}
								aria-label="Delete"
								size="small"
							>
								<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
							</IconButton>
						</Tooltip>

						<Tooltip title="Move to folder">
							<IconButton
								aria-label="More"
								aria-haspopup="true"
								onClick={(ev) => handleMenuOpen(ev, 'folders')}
								size="small"
							>
								<FuseSvgIcon>heroicons-outline:folder</FuseSvgIcon>
							</IconButton>
						</Tooltip>

						<Menu
							id="folders-menu"
							anchorEl={menu.folders}
							open={Boolean(menu.folders)}
							onClose={handleMenuClose}
						>
							{folders.length > 0 &&
								folders.map((folder) => (
									<MenuItem
										onClick={() => {
											setActionToMails({
												type: 'folder',
												value: folder.id,
												ids: selectedMailIds
											});
											handleMenuClose();
										}}
										key={folder.id}
									>
										{folder.title}
									</MenuItem>
								))}
						</Menu>

						<Tooltip title="Add label">
							<IconButton
								aria-label="label"
								aria-haspopup="true"
								onClick={(ev) => handleMenuOpen(ev, 'labels')}
								size="small"
							>
								<FuseSvgIcon>heroicons-outline:tag</FuseSvgIcon>
							</IconButton>
						</Tooltip>

						<Menu
							id="labels-menu"
							anchorEl={menu.labels}
							open={Boolean(menu.labels)}
							onClose={() => handleMenuClose()}
						>
							{labels.length > 0 &&
								labels.map((label) => (
									<MenuItem
										onClick={() => {
											setActionToMails({
												type: 'label',
												value: label.id,
												ids: selectedMailIds
											});
											handleMenuClose();
										}}
										key={label.id}
									>
										{label.title}
									</MenuItem>
								))}
						</Menu>

						<Tooltip title="Mark as unread">
							<IconButton
								onClick={() => {
									setActionToMails({ type: 'unread', value: true, ids: selectedMailIds });
								}}
								aria-label="Mark as unread"
								size="small"
							>
								<FuseSvgIcon>heroicons-outline:mail</FuseSvgIcon>
							</IconButton>
						</Tooltip>

						<Tooltip title="Set important">
							<IconButton
								onClick={() => {
									setActionToMails({ type: 'important', value: true, ids: selectedMailIds });
								}}
								aria-label="important"
								size="small"
							>
								<FuseSvgIcon className="text-red-600 dark:text-red-500">
									heroicons-outline:exclamation-circle
								</FuseSvgIcon>
							</IconButton>
						</Tooltip>

						<Tooltip title="Set starred">
							<IconButton
								onClick={() => {
									setActionToMails({ type: 'starred', value: true, ids: selectedMailIds });
								}}
								aria-label="important"
								size="small"
							>
								<FuseSvgIcon className="text-orange-500 dark:text-red-400">
									heroicons-outline:star
								</FuseSvgIcon>
							</IconButton>
						</Tooltip>
					</>
				)}
			</Box>
		</div>
	);
}

export default MailToolbar;
