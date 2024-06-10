import React, { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


function BasicInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;
    const groupeOptions = {
        "Universalité des jeux Olympiques" : 'universalite',
        "Entourage" : 'entourage',
        "Développement du sport" : 'developpement',
        "Valeurs Olympiques" : 'valeurs',
        "Gestion des CNO et partage de connaissances" : 'capciteadministration',
      };
    
      const domaineOptions ={
        "Athlètes et développement du Sport" : 'developpement',
        "Valeurs" : 'valeurs',
        "Développement des capacités et administration" : 'capciteadministration',
      }

      const federationOptions = ['Handball', 'Football', 'Basketball'];

      useEffect(() => {
        // Log all form data as an object
        console.log("Form Data:", methods.getValues());
    }, [methods.getValues()]); 

	return (
        <div>
<Controller
    name="titre"
    control={control}
    render={({ field }) => (
        <TextField
            {...field}
            className="mt-8 mb-16"
            required
            label="titre"
            autoFocus
            id="titre"
            variant="outlined"
            fullWidth
            error={!!errors.titre}
            helperText={errors?.titre?.message}
        />
    )}
/>

<Controller
    name="montant"
    control={control}
    render={({ field }) => (
        <TextField
            {...field}
            className="mt-8 mb-16"
            required
            label="Montant"
            id="montant"
            type="number"
            variant="outlined"
            fullWidth
            value={field.value || ''} // Ensure value is a string
            onChange={(e) => field.onChange(parseFloat(e.target.value))} // Parse input value as a number
            error={!!errors.montant}
            helperText={errors?.montant?.message}
        />
    )}
/>




<Controller
            name="federation"
            control={control}
            render={({ field }) => (
                <FormControl variant="outlined" className="mt-8 mb-16" fullWidth>
                    <InputLabel>Federation</InputLabel>
                    <Select {...field} label="Federation">
                        {federationOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />


        <Controller
            name="domaine"
            control={control}
            render={({ field }) => (
                <FormControl variant="outlined" className="mt-8 mb-16" fullWidth>
                    <InputLabel>Domaine de developpement</InputLabel>
                    <Select {...field} label="Domaine de developpement">
                        {Object.entries(domaineOptions).map(([key, value]) => (
                            <MenuItem key={value} value={value}>
                                {key}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />

        <Controller
            name="groupe"
            control={control}
            render={({ field }) => (
                <FormControl variant="outlined" className="mt-8 mb-16" fullWidth>
                    <InputLabel>Groupe de programme</InputLabel>
                    <Select {...field} label="Groupe de programme">
                        {Object.entries(groupeOptions).map(([key, value]) => (
                            <MenuItem key={value} value={value}>
                                {key}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />

		<Controller
			name="documents"
			control={control}
			defaultValue={[]}
			render={({ field: { onChange, value } }) => (
				<Autocomplete
					className="mt-8 mb-16"
					multiple
					freeSolo
					options={[]}
					value={value}
					onChange={(event, newValue) => {
						onChange(newValue);
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							placeholder="Select multiple documents"
							label="Documents"
							variant="outlined"
							InputLabelProps={{
								shrink: true
							}}
						/>
					)}
				/>
			)}
		/>

		<Controller
			name="description"
			control={control}
			render={({ field }) => (
				<TextField
					{...field}
					className="mt-8 mb-16"
					id="description"
					label="Description"
					type="text"
					multiline
					rows={5}
					variant="outlined"
					fullWidth
				/>
			)}
		/>
	</div>
	);
}

export default BasicInfoTab