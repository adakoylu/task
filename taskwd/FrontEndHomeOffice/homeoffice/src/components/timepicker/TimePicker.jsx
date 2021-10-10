import * as React from 'react';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from './Table';



export default function TimePicker() {
  const [value, setValue] = React.useState(new Date());
  const [bringTable, SetBringTable] = React.useState(false);

  const pickTable = ()=>{
    SetBringTable(true)

  }

  return (
      <div>
        <Box m={3}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        value={value}
        
        shouldDisableDate={isWeekend}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>

    <Box m={3} pt={3}>
        <Button variant="contained" onClick={pickTable} sx={{ m: 2 }} >Check</Button>
        {bringTable? <Table/>: null}
    </Box>
    </Box>
</div>
  );
}
