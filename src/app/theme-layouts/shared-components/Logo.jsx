import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
	'& > .logo-icon': {
		transition: theme.transitions.create(['width', 'height'], {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	},
	'& > .badge': {
		transition: theme.transitions.create('opacity', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	}
}));

/**
 * The logo component.
 */
function Logo() {
	return (
		<Root className="flex items-center justify-center h-screen">
  <div className="flex items-center justify-center bg-white p-4 rounded-lg shadow-lg">
    <img
      className="logo-icon h-32 w-32"
      src="assets/images/logo/CNOT_logo.svg"
      alt="logo"
    />
  </div>
</Root>

	);
}

export default Logo;
