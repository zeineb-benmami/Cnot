import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import _ from '@lodash';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useJwtAuth from 'src/app/auth/services/jwt/useJwtAuth';
/**
 * Form Validation Schema
 */
const schema = z
	.object({
		displayName: z.string().nonempty('Nom obligatoire'),
		email: z.string().email('Emzil est invalide').nonempty('Email est obligatoire'),
		password: z
			.string()
			.nonempty('Veuillez entrer une mot de passe.')
			.min(8, 'Il doit contenir au moins 8 caractères .'),
		passwordConfirm: z.string().nonempty('Confirmation de mot de passe est obligatoire'),
		acceptTermsConditions: z.boolean().refine((val) => val === true, "Vous devez accepter les conditions d'utilisation.")
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords must match',
		path: ['passwordConfirm']
	});
const defaultValues = {
	displayName: '',
	email: '',
	password: '',
	passwordConfirm: '',
	acceptTermsConditions: false
};

function JwtSignUpForm() {
	const { signUp } = useJwtAuth();
	const { control, formState, handleSubmit, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});
	const { isValid, dirtyFields, errors } = formState;

	function onSubmit(formData) {
		const { displayName, email, password } = formData;
		signUp({
			displayName,
			password,
			email
		})
			.then(() => {
				// No need to do anything, registered user data will be set at app/auth/AuthRouteProvider
			})
			.catch((_errors) => {
				_errors.forEach(({ message, type }) => {
					setError(type, { type: 'manual', message });
				});
			});
	}

	return (
		<form
			name="registerForm"
			noValidate
			className="mt-32 flex w-full flex-col justify-center"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Controller
				name="displayName"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Nom"
						autoFocus
						type="name"
						error={!!errors.displayName}
						helperText={errors?.displayName?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Email"
						type="email"
						error={!!errors.email}
						helperText={errors?.email?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="password"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Mot de passe"
						type="password"
						error={!!errors.password}
						helperText={errors?.password?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="passwordConfirm"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Mot de passe (Confirmer)"
						type="password"
						error={!!errors.passwordConfirm}
						helperText={errors?.passwordConfirm?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="acceptTermsConditions"
				control={control}
				render={({ field }) => (
					<FormControl
						className="items-center"
						error={!!errors.acceptTermsConditions}
					>
						<FormControlLabel
							label="J'accepte les conditions d'utilisation et la politique de confidentialité."
							control={
								<Checkbox
									size="small"
									{...field}
								/>
							}
						/>
						<FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
					</FormControl>
				)}
			/>

			<Button
				variant="contained"
				color="secondary"
				className="mt-24 w-full"
				aria-label="Register"
				disabled={_.isEmpty(dirtyFields) || !isValid}
				type="submit"
				size="large"
			>
				Create your free account
			</Button>
		</form>
	);
}

export default JwtSignUpForm;
