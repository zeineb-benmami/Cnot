import React, { useEffect, useState } from 'react';
import withRouter from '@fuse/core/withRouter';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { getEmailById } from 'src/services/mailService';
import MailAttachment from '../MailAttachment';

function MailDetails() {
  const { mailId } = useParams();
  const [selectedEmail, setSelectedEmail] = useState(null);

  const fetchEmailById = async (id) => {
    try {
      const result = await getEmailById(id);
      const data = result.data;
      setSelectedEmail(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmailById(mailId);
  }, [mailId]);

  const deleteEmail = async (id) => {
    // Implement your deleteEmail function
  };

  const bookmarkEmail = async (id) => {
    // Implement your bookmarkEmail function
  };

  const downloadFile = (fileName) => {
    // Implement your downloadFile function
  };

  return selectedEmail && (
		<>
			<div className="z-10 relative flex flex-col flex-0 w-full border-b">

				<div className="flex flex-wrap items-center py-20 px-24">
					<div className="flex flex-auto my-4 mr-16 text-2xl">{selectedEmail.subject}</div>
					{selectedEmail.labels && selectedEmail.labels.length > 0 && (
						<div className="flex flex-wrap items-center justify-start -mx-4">
							{selectedEmail.labels.map((labelId) => (
								<selectedEmailLabel
									className="m-4"
									key={labelId}
									labelId={labelId}
								/>
							))}
						</div>
					)}
				</div>
			</div>

			<Box
				sx={{ backgroundColor: 'background.default' }}
				className="flex flex-col flex-auto shrink-0 lg:shrink p-12 lg:overflow-y-auto"
			>
				<Paper className="flex flex-col flex-0 w-full shadow rounded-2xl overflow-hidden">
					<div className="flex flex-col py-32 px-24">
						<div className="flex items-center w-full">
            <div className="relative inline-flex items-center justify-center w-40 h-40 overflow-hidden bg-black rounded-full">
            <span className="font-medium text-white">{selectedEmail.from?.charAt(0)}</span>
          </div>
							<div className="ml-16 min-w-0">
								<Typography className="font-semibold truncate">
									{selectedEmail.from.split('<')[0].trim()}
								</Typography>

								<div className="flex items-center mt-8 leading-5">
									<div>to</div>
									<div className="mx-4 font-semibold">me</div>
									{(selectedEmail.cc?.length ?? 0) + (selectedEmail.bcc?.length ?? 0) > 0 && (
										<div>
											<span className="mx-4">and</span>
											<span className="mx-4 font-semibold">
												{(selectedEmail.cc?.length ?? 0) + (selectedEmail.bcc?.length ?? 0)}
											</span>
											<span className="mx-4 font-semibold">
												{(selectedEmail.cc?.length ?? 0) + (selectedEmail.bcc?.length ?? 0) === 1
													? 'other'
													: 'others'}
											</span>
										</div>
									)}
								</div>
							</div>
						</div>
						<Typography
							className="flex mt-32 whitespace-pre-line leading-relaxed"
							variant="body2"
							dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
						/>

						{selectedEmail.attachments && selectedEmail.attachments?.length > 0 && (
							<div className="flex flex-col w-full">
								<div className="flex items-center mt-48">
									<FuseSvgIcon size={20}>heroicons-solid:paper-clip</FuseSvgIcon>
									<div className="mx-8 font-semibold">{selectedEmail.attachments.length} Attachments</div>
								</div>

								<div className="flex flex-wrap -m-12 mt-12">
									{selectedEmail.attachments.map((attachment, index) => (
										<MailAttachment
											key={index}
											attachment={{className:'test',fileName:'test',size:'test'}}
										/>
									))}
								</div>
							</div>
						)}
					</div>

					<Box
						className="flex w-full p-24 border-t"
						sx={{ backgroundColor: 'background.default' }}
					>
						<div className="flex flex-wrap w-full -m-8">
							<Button
								className="m-8"
								color="secondary"
								startIcon={<FuseSvgIcon size={20}>heroicons-solid:reply</FuseSvgIcon>}
								variant="outlined"
							>
								Reply
							</Button>
							<Button
								className="m-8"
								color="secondary"
								startIcon={<FuseSvgIcon size={20}>heroicons-solid:reply</FuseSvgIcon>}
								variant="outlined"
							>
								Reply All
							</Button>

							<Button
								className="m-8"
								color="secondary"
								startIcon={<FuseSvgIcon size={20}>heroicons-solid:chevron-double-right</FuseSvgIcon>}
								variant="outlined"
							>
								Forward
							</Button>
						</div>
					</Box>
				</Paper>
			</Box>
		</>
  )
}

export default MailDetails;
