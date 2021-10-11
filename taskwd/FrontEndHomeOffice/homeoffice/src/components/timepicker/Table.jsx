import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function DataTable(props) {
  props.arbeitszeiten && console.log('propdan gelen :'+ props.arbeitszeiten)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">

        <TableHead>
          <TableRow>
            <TableCell>Arbeitzeiten am tag {props.day}</TableCell>
            <TableCell>Stunde</TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {props.arbeitszeiten && props.arbeitszeiten.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.w_hours}

              </TableCell>

            </TableRow>
          ))}
             <TableRow>



          </TableRow>
          

        </TableBody>
      </Table>
    </TableContainer>
  );
}
