import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import JwtSignInForm from '../../../auth/services/jwt/components/JwtSignInForm';

function jwtSignInTab() {
	return (
		<div className="w-full">
			<JwtSignInForm />

			<div className="mt-32 flex items-center">
				<div className="mt-px flex-auto border-t" />
				<Typography
					className="mx-8"
					color="text.secondary"
				>
				À propos de nous
				</Typography>
				<div className="mt-px flex-auto border-t" />
			</div>
			<div className="flex justify-center mt-32">
  <Button
    variant="outlined"
    className="w-8 h-8 p-1"
    href='https://www.facebook.com/CNOTunisie/?locale=fr_FR'
  >
    <FuseSvgIcon
      size={16}
      color="action"
    >
      feather:facebook
    </FuseSvgIcon>
  </Button>
</div>


		</div>
	);
}

export default jwtSignInTab;
