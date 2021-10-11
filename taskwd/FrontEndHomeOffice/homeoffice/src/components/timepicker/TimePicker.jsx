import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import DataTable from './Table';

const getApi = async(api,token) =>  axios.get(api, { headers: {"Authorization" : `Bearer ${token}`} }
)

export default function TimePicker() {
  const [value, setValue] = React.useState(new Date().toJSON().slice(0, 10));
  const [bringTable, SetBringTable] = React.useState(false);
  const [data, SetData] = React.useState();
  const [day, SetDay] = React.useState();
  const token = localStorage.getItem("accessToken");
  const api = `https://homeoffice.be.aksu.io/api-root/day/${value}` ;

  const pickTable = ()=>{
    SetBringTable(true)

    getApi(api,token)
    .then(res => {
      SetData(res.data);
      SetDay(value);

      })
      .catch((error) => {
        console.log(error);
        
      })

  }

  return (
      <div>
        <Box m={3}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        value={value}
        
        
        onChange={(newValue) => {
          setValue(newValue.toJSON().slice(0, 10));
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>

    <Box m={3} pt={3}>
        <Button variant="contained" onClick={pickTable} sx={{ m: 2 }} >Check</Button>
        {bringTable? <DataTable arbeitszeiten={data} day ={day}/>: null}
    </Box>
    </Box>
</div>
  );
}
