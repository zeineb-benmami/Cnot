import LinearProgress from '@mui/material/LinearProgress';
import clsx from 'clsx';

/**
 * The CourseProgress component.
 */
function BourseProgress(props) {
	const { bourse, className } = props;
	return (
		<LinearProgress
			className={clsx('w-full h-2', className)}
			variant="determinate"
			value={80 / 100}
			color="secondary"
		/>
	);
}

export default BourseProgress;
