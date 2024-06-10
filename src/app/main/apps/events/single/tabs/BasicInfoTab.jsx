import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

/**
 * The basic info tab.
 */
function BasicInfoTab() {
  const [typeEvt, setTypeEvt] = React.useState("");

  const handleChange = (event) => {
    setTypeEvt(event.target.value);
  };

  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  return (
    <div>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            label="Titre"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
        )}
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type d'évènement</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={typeEvt}
          label="type"
          onChange={handleChange}
        >
          <MenuItem value={10}>Initiative</MenuItem>
          <MenuItem value={20}>Formation</MenuItem>
          <MenuItem value={30}>Atelier</MenuItem>
        </Select>
      </FormControl>

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

      <div className=" flex flex-row gap-3 mt-8 mb-16">
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="startDate"
              label="Date début"
              type="date"
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="endDate"
              label="Date fin"
              type="date"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>

      <div className=" flex flex-row gap-5 mt-8 mb-16">
        <Controller
          name="participants"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="participants"
              label="Participants"
              type="number"
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          name="budget"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="budget"
              label="Budget"
              type="number"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
    </div>
  );
}

export default BasicInfoTab;
