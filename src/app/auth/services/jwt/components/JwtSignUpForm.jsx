import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, FormControl, FormHelperText, Select, MenuItem, InputLabel, IconButton, InputAdornment , Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signup } from '../../../../../services/apiUser';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const tunisianRegions = [
  "Ariana", "Beja", "Ben Arous", "Bizerte", "Gabes", "Gafsa",
  "Jendouba", "Kairouan", "Kasserine", "Kebili", "Kef", "Mahdia",
  "Manouba", "Medenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid",
  "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"
];

const schema = z.object({
  name: z.string().min(1, 'Nom obligatoire'),
  email: z.string().email('Email est invalide').min(1, 'Email est obligatoire'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  passwordConfirm: z.string().min(8, 'La confirmation du mot de passe doit également contenir au moins 8 caractères'),
  address: z.string().min(1, 'Adresse est obligatoire'),
  tel: z.string().min(8, 'Le numéro de téléphone doit contenir au moins 8 chiffres'),
  certificate: z.any().optional(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['passwordConfirm']
});

function JwtSignUpForm() {
  const navigate = useNavigate(); // Initialize useNavigate

  const [currentStep, setCurrentStep] = useState(0);
  const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      address: '',
      tel: '',
      certificate: null
    }
  });
  const [certificate, setCertificate] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpeg', '.png', '.gif']
    },
    onDrop: (acceptedFiles) => {
      setCertificate(acceptedFiles[0]);
      setValue('certificate', acceptedFiles[0]);
    },
  });

  const isFirstStepValid = () => {
    const values = getValues();
    return values.name && values.email && values.password && values.passwordConfirm &&
           !errors.name && !errors.email && !errors.password && !errors.passwordConfirm;
  };

  const isSecondStepValid = () => {
    const values = getValues();
    return values.address && values.tel && certificate &&
           !errors.address && !errors.tel;
  };

  const onSubmit = async (formData) => {
    if (currentStep === 0) {
      setCurrentStep(1);  // Proceed to next step
    } else {
      try {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('address', formData.address);
        data.append('tel', formData.tel);
        if (certificate) {
          data.append('certificate', certificate);
        }

        await signup(data);

        Swal.fire('Succès!', 'Votre compte a été créé avec succès.', 'success');
        navigate('/sign-in');
      } catch (error) {
        console.error(error);
        const errorMessage = error.response?.data?.error || "Un problème est survenu lors de votre inscription. Veuillez réessayer plus tard.";
        Swal.fire('Erreur!', errorMessage, 'error');
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {currentStep === 0 && (
        <>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} label="Nom" autoFocus error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth margin="normal" />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} label="Email" type="email" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth margin="normal" />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} label="Mot de passe" type="password" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth margin="normal" />
            )}
          />
          <Controller
            name="passwordConfirm"
            control={control}
            render={({ field, fieldState }) => (
              <TextField {...field} label="Confirmer le mot de passe" type="password" error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth margin="normal" />
            )}
          />
          <Button type="button" onClick={() => setCurrentStep(1)} fullWidth variant="contained" color="secondary" disabled={!isFirstStepValid()} sx={{ mt: 2, width: '80%' }}>
            Suivant
          </Button>
        </>
      )}
      {currentStep === 1 && (
        <>
          <IconButton onClick={() => setCurrentStep(0)} sx={{ alignSelf: 'flex-start', marginBottom: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Controller
            name="address"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth error={!!fieldState.error} margin="normal">
                <InputLabel>Adresse</InputLabel>
                <Select {...field} label="Adresse" defaultValue="">
                  <MenuItem value="">Sélectionnez votre région</MenuItem>
                  {tunisianRegions.map((region, index) => (
                    <MenuItem key={index} value={region}>{region}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            name="tel"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Numéro de téléphone"
                type="tel"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+216</InputAdornment>
                  )
                }}
              />
            )}
          />
           <Typography variant="body1" color="textSecondary" sx={{ mb: 1 }}>
            Logo de la Fédération
          </Typography>
          <div {...getRootProps()} className="dropzone mb-6" style={{ width: '100%', height: '150px', border: '2px dashed gray', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px' }}>
            <input {...getInputProps()} />
            {certificate ? (
              <img src={URL.createObjectURL(certificate)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M33 18l-9 9-9-9m9 9V6m14 30H6"></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    {isDragActive ? "Déposez les fichiers ici ..." : "Télécharger votre LOGO"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PDFs, JPGs, PNGs acceptés</p>
                </div>
              </div>
            )}
            {errors.certificate && <p className="text-red-500 text-sm mt-2">{errors.certificate.message}</p>}
          </div>
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={!isSecondStepValid()} sx={{ mt: 2, width: '80%' }}>
            S'inscrire
          </Button>
        </>
      )}
    </form>
  );
}

export default JwtSignUpForm;
