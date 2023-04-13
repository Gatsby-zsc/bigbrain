import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

function Option (props) {
  const [option, setOption] = useState(props.value);
  const [Field, setOptionField] = useState(option.optionField);
  const [Correct, setOptionCorrect] = useState(option.optionCorrect);

  const options = props.options;
  const optionNumber = props.oid;
  const setOptions = props.optionFunction;
  const newOptionId = option.optionId;

  // update options when we modify one of the option
  useEffect(() => {
    const newOptions = options.map((eachOption) => {
      if (eachOption.optionId === newOptionId) {
        return option;
      } else {
        return eachOption;
      }
    })

    setOptions(newOptions);
  }, [option])

  // update option when we modify its field
  useEffect(() => {
    setOption({ optionId: newOptionId, optionField: Field, optionCorrect: Correct });
  }, [Correct, Field])

  return (
    <>
      <Typography
         variant='subtitle2'
         sx={ { mt: 1, mb: 1 } }
      >
        Option {optionNumber}
      </Typography>
      <div>
        <OutlinedInput
          variant='outlined'
          value={Field}
          onChange={(e) => { setOptionField(e.target.value) } }
          endAdornment={
            <InputAdornment position='end'>
              <IconButton onClick={ () => { setOptionCorrect(!Correct) } }>
                {Correct === true
                  ? <CheckBoxIcon
                      color='primary'
                    />
                  : <CheckBoxOutlineBlankIcon
                      color='primary'
                    />
                }
              </IconButton>
            </InputAdornment>
          }
        >
        </OutlinedInput>
      </div>
    </>
  )
}

export default Option;
