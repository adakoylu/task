import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useNavigate  } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


export const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
  }));



 

export default function Logout(props) {
const navigate = useNavigate();
const user = localStorage.getItem('HOuser')


console.log("user:  " +user)
const handleLogout = () =>{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("HOuser")
    localStorage.removeItem("login")

    console.log('handeleClick Log out clicked');
    navigate("")
    window.location.reload()

}

    return (
        <div>
            <Box m={2} >
            <Stack spacing={2} direction="row" justifyContent="center" >
                <Button variant="contained" onClick={()=> navigate('counter')} >Arbeitsstatus</Button>
                <Button variant="contained" onClick={()=>navigate('timepicker')} >Arbeitszeiten </Button>
                <Button variant="contained" onClick={handleLogout} >Log out</Button>
                <Item>Seite für {props.user}</Item>
            </Stack>
            </Box>
            
        </div>
    )
}
