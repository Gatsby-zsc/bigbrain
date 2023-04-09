import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function Option (props) {
  const [option, setOption] = useState(props.value);
  const [Field, setOptionField] = useState(option.optionField);
  const [Correct, setOptionCorrect] = useState(option.optionCorrect);
  const [options] = useState(props.options);

  const setOptions = props.optionFunction;
  // const questionId = question.questionId;
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
        Option
      </Typography>
      <div>
        <TextField
          variant='outlined'
          value={Field}
          onChange={(e) => { setOptionField(e.target.value) } }
        >
        </TextField>
        <IconButton sx={ { mt: 1 } } onClick={ () => { setOptionCorrect(!Correct) } }>
          {Correct === true
            ? <RadioButtonCheckedIcon
                color='primary'
              />
            : <RadioButtonUncheckedIcon
                color='primary'
              />
          }
        </IconButton>
      </div>
    </>
  )
}

export default Option;
