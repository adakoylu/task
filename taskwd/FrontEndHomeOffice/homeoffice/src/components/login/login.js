import * as React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { Item } from './logout';

export default function Login() {
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    showPassword: false,
  });
  

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const navigate = useNavigate();
 
  const handleClickLoginRequest = () =>{
     
      console.log('values : '+values.username)
    axios.post('http://127.0.0.1:8000/login/',{
        username: values.username,
        password: values.password
      })
      .then( (response) => {
        console.log(response);
        localStorage.setItem('accessToken', response.data.access);
        

        navigate('counter');
       
      })
      .catch( (error) => {
        console.log('errorLoginJS' + error);
        alert('login unsuccessful')
      });

  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
          <Box>
        <TextField
          label="username"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          value={values.username}
          onChange={handleChange('username')}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        </Box>
        <Box>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        </Box>

        <Box>
            <Button variant="contained" onClick= {handleClickLoginRequest}>Login</Button>
        </Box>
        
      </div>
      
    </Box>
  );
}
