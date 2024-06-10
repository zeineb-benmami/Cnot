import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button, FormControl, FormHelperText, Select, MenuItem, InputLabel, IconButton, ListItemText, Avatar, ListItemAvatar, InputAdornment } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useJwtAuth from 'src/app/auth/services/jwt/useJwtAuth';

const tunisianRegions = [
    "Ariana", "Beja", "Ben Arous", "Bizerte", "Gabes", "Gafsa", 
    "Jendouba", "Kairouan", "Kasserine", "Kebili", "Kef", "Mahdia", 
    "Manouba", "Medenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", 
    "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"
];

const logos = [
    { name: "Federation1", path: "/assets/logos/federation1.png" },
    { name: "Federation2", path: "/assets/logos/federation2.png" },
    { name: "Federation3", path: "/assets/logos/federation3.png" }
];

const schema = z.object({
    displayName: z.string().min(1, 'Nom obligatoire'),
    email: z.string().email('Email est invalide').min(1, 'Email est obligatoire'),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    passwordConfirm: z.string().min(8, 'La confirmation du mot de passe doit également contenir au moins 8 caractères'),
    address: z.string().min(1, 'Adresse est obligatoire'),
    tel: z.string().min(8, 'Le numéro de téléphone doit contenir au moins 8 chiffres'),
    certificate: z.string().min(1, 'Logo obligatoire'),
}).refine((data) => data.password === data.passwordConfirm, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['passwordConfirm']
});

function JwtSignUpForm() {
    const { signUp } = useJwtAuth();
    const [currentStep, setCurrentStep] = useState(0);
    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            displayName: '',
            email: '',
            password: '',
            passwordConfirm: '',
            address: '',
            tel: '',
            certificate: ''
        }
    });

    const isFirstStepValid = () => {
        const values = getValues();
        return values.displayName && values.email && values.password && values.passwordConfirm &&
               !errors.displayName && !errors.email && !errors.password && !errors.passwordConfirm;
    };

    const isSecondStepValid = () => {
        const values = getValues();
        return values.address && values.tel && values.certificate &&
               !errors.address && !errors.tel && !errors.certificate;
    };

    const onSubmit = formData => {
        if (currentStep === 0) {
            setCurrentStep(1);  // Proceed to next step
        } else {
            signUp(formData)
                .then(() => {
                    // Handle success
                })
                .catch(error => {
                    // Handle error
                    console.error(error);
                });
        }
    };

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {currentStep === 0 && (
                <>
                    <Controller
                        name="displayName"
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
                                    <MenuItem value="">Select a region</MenuItem>
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
                                        <InputAdornment position="start">
                                            <Avatar src="/assets/flags/tn.png" sx={{ width: 24, height: 24 }} />
                                            <span style={{ marginLeft: 8 }}>+216</span>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="certificate"
                        control={control}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth error={!!fieldState.error} margin="normal">
                                <InputLabel>Logo</InputLabel>
                                <Select
                                    {...field}
                                    label="Logo"
                                    defaultValue=""
                                    onChange={e => setValue('certificate', e.target.value, { shouldValidate: true })}
                                >
                                    <MenuItem value="">Select a logo</MenuItem>
                                    {logos.map((logo, index) => (
                                        <MenuItem key={index} value={logo.name}>
                                            <ListItemAvatar>
                                                <Avatar src={logo.path} />
                                            </ListItemAvatar>
                                            <ListItemText primary={logo.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{fieldState.error?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                    <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2, width: '80%' }} disabled={!isSecondStepValid()}>
                        S'inscrire
                    </Button>
                </>
            )}
        </form>
    );
}

export default JwtSignUpForm;
