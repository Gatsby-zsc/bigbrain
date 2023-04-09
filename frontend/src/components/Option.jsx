import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function Option (props) {
  const option = props.value;
  const [optionField, setOptionField] = useState(option.optionField);
  const [optionCorrect, setOptionCorrect] = useState(option.optionCorrect);
  console.log(option);
  return (
    <>
      <Typography
         variant='subtitle2'
         sx={ { mt: 1, mb: 1 } }
      >
        Option
      </Typography>
      <TextField
        variant='outlined'
        value={optionField}
        onChange={(e) => { setOptionField(e.target.value) } }
        fullWidth
      >
      </TextField>
      <Typography
         variant='subtitle2'
         sx={ { mt: 1, mb: 1 } }
      >
        OptionCorrect
      </Typography>
      <Select
        value={optionCorrect}
        onChange={(e) => { setOptionCorrect(e.target.value) } }
        fullWidth
      >
        <MenuItem value={true}>true</MenuItem>
        <MenuItem value={false}>false</MenuItem>
      </Select>
    </>
  )
}

export default Option;
