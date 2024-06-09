import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import _ from '@lodash';
import JwtLoginTab from './tabs/JwtSignInTab';

const tabs = [
  {
    id: 'jwt',
    title: 'JWT',
    logo: 'assets/images/logo/jwt.svg',
    logoClass: 'h-40 p-4 bg-black rounded-12'
  }
];

/**
 * The sign in page.
 */
function SignInPage() {
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  function handleSelectTab(id) {
    setSelectedTabId(id);
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
      <Paper className="h-full w-full px-8 py-4 ltr:border-r-1 rtl:border-l-1 sm:h-auto sm:w-auto sm:rounded-2xl sm:p-24 sm:shadow md:flex md:h-full md:w-2/5 md:items-center md:justify-center md:rounded-none md:p-32 md:shadow-none">
        <CardContent className="flex flex-col items-center w-full max-w-320 sm:w-320">
          <img className="w-48" src="assets/images/logo/CNOT_logo.svg" alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight text-center">
            Se Connecter
          </Typography>
          <div className="mt-2 flex items-baseline font-medium">
            <Typography>Vous n'avez pas un compte ?</Typography>
            <Link className="ml-4" to="/sign-up">
              S'inscrire
            </Link>
          </div>

          {selectedTabId === 'jwt' && <JwtLoginTab />}
        </CardContent>
      </Paper>

      <Box
        className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-64 md:flex lg:px-112"
        sx={{ backgroundColor: 'primary.main' }}
      >
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(50%)' }}
        >
          <source src="assets/images/logo/cnot.mp4" type="video/mp4" />
        </video>
        <Box className="absolute inset-0 bg-primary-main opacity-60"></Box>

        <div className="relative z-10 w-full max-w-2xl">
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>Bienvenue dans</div>
            <div>CNOT Perform</div>
          </div>
          <div className="mt-24 text-lg leading-6 tracking-tight text-white">
            CNOT Perform révolutionne l'entraînement sportif grâce à l'Intelligence Artificielle. Suivez vos performances en temps réel, analysez vos données pour identifier vos points forts et faibles, recevez des conseils personnalisés et prévenez les blessures. Rejoignez-nous pour améliorer vos performances sportives et atteindre vos objectifs.
          </div>
          <div className="mt-32 flex items-center">
            <AvatarGroup
              sx={{
                '& .MuiAvatar-root': {
                  borderColor: 'primary.main'
                }
              }}
            >
              {/* Uncomment and add actual avatars if needed */}
              {/* <Avatar src="assets/images/avatars/female-18.jpg" />
              <Avatar src="assets/images/avatars/female-11.jpg" />
              <Avatar src="assets/images/avatars/male-09.jpg" />
              <Avatar src="assets/images/avatars/male-16.jpg" /> */}
            </AvatarGroup>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default SignInPage;
