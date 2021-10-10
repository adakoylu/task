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
  localStorage.setItem('login', false);
})

export default function Counter() {
//   const [workstarted, setworkstarted] = React.useState(false);
  const [values, setValues] = React.useState({
    start: '',
    stop: '',
    workstarted: false,
  
  });
  const userId = localStorage.getItem("HOuserId");
  const token = localStorage.getItem("accessToken")
  const api_entry = "http://127.0.0.1:8000/api-root/checkin//"
  const api_edit = "http://127.0.0.1:8000/api-root/checkin/"
 

  function handleStop(){
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        setValues({...values, stop:time, workstarted:false})
        console.log('Stop '+time)

  }

   function handleStart() {
        // workstarted? setworkstarted(false):setworkstarted(true);
        const today =  new Date();
        const time =  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        setValues({...values, start:time, workstarted:true, stop:''})
        console.log('Start '+time)
        postApi( )

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
