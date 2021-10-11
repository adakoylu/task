import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopIcon from '@mui/icons-material/Stop';
import axios from 'axios';

const postApi = async(api,data,token) =>  axios.post(api ,data, { headers: {"Authorization" : `Bearer ${token}`} }
)
.then(res => {
console.log(res.data);
})
.catch((error) => {
  console.log(error);
  
})

const putApi = async(api,data,token) =>  axios.put(api ,data, { headers: {"Authorization" : `Bearer ${token}`} }
)
.then(res => {
console.log(res.data);
})
.catch((error) => {
  console.log(error);
  
})

const getTime = () => {
  const today = new Date();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time
}

export default function Counter() {

let status = JSON.parse(localStorage.getItem('status'));

  const [values, setValues] = React.useState({
    start: status.isWorking? status.lastStart : '',
    stop: '',
    workstarted: status.isWorking,
    
  });
  const userId = localStorage.getItem("HOuserId");
  const token = localStorage.getItem("accessToken");
  const api_entry = "https://homeoffice.be.aksu.io/api-root/day/" ;
  const api_edit = (id) => `https://homeoffice.be.aksu.io/CheckIn/${id}/`;
  function handleStop(){
        const time = getTime();
        const today =  new Date();
        setValues({...values, stop:time, workstarted:false});
        console.log('Stop '+time);
        const data = {
          "personal": userId,
          "start_time": values.start,
          "finish_time": time,
          "day": today.toJSON().slice(0, 10),
          "isWorking": false
      };
        putApi(api_edit(userId),data,token)
  }

   function handleStart() {
        // workstarted? setworkstarted(false):setworkstarted(true);
        const today =  new Date();
        const time = getTime();
        setValues({...values, start:time, workstarted:true, stop:''})
        console.log('Start '+time);
        const data = {
          "personal": userId,
          "start_time": time,
          "finish_time": null,
          "day": today.toJSON().slice(0, 10),
          "isWorking": true
      };
      console.log(data);
      postApi(api_entry,data,token);

  }
  
  return (
      <div>
    <Box  sx={{ p: 2,  }} >
    <Stack direction="row" spacing={30}>
      <LoadingButton
        onClick={handleStart}
        startIcon={<PlayCircleOutlineIcon />}
        loading={values.workstarted}
        // loadingPosition="end"
        variant="contained"
      >
        Start
      </LoadingButton>
      <LoadingButton
        color="secondary"
        onClick={handleStop}
        disabled={!values.workstarted}
        loadingPosition="start"
        startIcon={<StopIcon />}
        variant="contained"
      >
        Stopp
      </LoadingButton>
      </Stack>
    </Box>


 <Box  sx={{ p: 2, border: '1px dashed grey' }}  >
  <Stack direction="row" spacing={30}>
    <Box component="span"
      sx={{ 
        width: 100  ,
        height: 40,
        alignContent : 'center'
      }}><p>{values.start}</p> 
      </Box>

      <Box component="span"
      sx={{
        width: 100  ,
        height: 40,
        alignContent : 'center'
      }}><p>{values.stop}</p> 
      </Box>
    </Stack>
  </Box>          
</div>    
  );
}
