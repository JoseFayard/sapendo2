import { TextField } from "@mui/material";
import { useField } from "formik";

const TextFieldPersonalizado = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configtextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };

  if (meta && meta.touched && meta.error) {
    configtextField.error = true;
    configtextField.helperText = meta.error;
  }

  return <TextField {...configtextField} />;
};

export default TextFieldPersonalizado;
