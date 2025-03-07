import { MenuItem, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";

const SelectPersonalizado = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    name: name,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <>
      <TextField {...configSelect}>
        {options.map((item, pos) => {
          return (
            <MenuItem key={pos} value={item.nombre}>
              {item.nombre}
            </MenuItem>
          );
        })}
      </TextField>
    </>
  );
};

export default SelectPersonalizado;
