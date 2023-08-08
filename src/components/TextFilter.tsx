import React from "react";
import TextField from "@mui/material/TextField";

interface ITextFilter {
  onChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  value: string;
  label: string;
  disabled: boolean;
}
function TextFilter({ disabled, value, onChange, label }: ITextFilter) {
  return (
    <TextField
      disabled={disabled}
      onChange={onChange}
      value={value}
      id="standard-basic"
      label={label}
      variant="standard"
    />
  );
}

export default TextFilter;
