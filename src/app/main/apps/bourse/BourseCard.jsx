import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
import BourseInfo from './BourseInfo';
import BourseProgress from './BourseProgress';

/**
 * The CourseCard component.
 */
function BourseCard(props) {
	const { bourse } = props;

	function buttonStatus() {
		switch (bourse.activeStep) {
			case bourse.totalSteps:
				return 'Completed';
			case 0:
				return 'Start';
			default:
				return 'Continue';
		}
	}

	return (
		<Card className="flex flex-col h-384 shadow">
			<CardContent className="flex flex-col flex-auto p-24">
				<BourseInfo bourse={bourse} />
			</CardContent>
			<BourseProgress bourse={bourse} />
			<CardActions
				className="items-center justify-end py-16 px-24"
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? lighten(theme.palette.background.default, 0.4)
							: lighten(theme.palette.background.default, 0.03)
				}}
			>
				<Button
					to={`/apps/bourses/${bourse._id}`}
					component={Link}
					className="px-16 min-w-128"
					color="secondary"
					variant="contained"
					endIcon={<FuseSvgIcon size={20}>heroicons-solid:arrow-sm-right</FuseSvgIcon>}
				>
					Consulter
				</Button>
			</CardActions>
		</Card>
	);
}

export default BourseCard;
