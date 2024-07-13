
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Config {
  rows: Array<{
    rangeHours: string;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    pressure: number;
    cloudiness: number;
  }>;
}

const kelvinToCelsius = (kelvin: number) => {
  return (kelvin - 273.15).toFixed(2);
}

export default function BasicTable(data: Config) {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    setRows(data.rows);
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rango de horas</TableCell>
            <TableCell align="right">Humedad [%]</TableCell>
            <TableCell align="right">Velocidad del viento [m/s]</TableCell>
            <TableCell align="right">Pressure [hPa]</TableCell>
            <TableCell align="right">Temperatura [Kelvin]</TableCell>
            <TableCell align="right">Nubosidad [%]</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.rangeHours} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.rangeHours}
              </TableCell>
              <TableCell align="right">{row.humidity}</TableCell>
              <TableCell align="right">{row.windDirection}</TableCell>
              <TableCell align="right">{row.pressure}</TableCell>
              <TableCell align="right">{kelvinToCelsius(parseFloat(row.temperature))} °C</TableCell>
              <TableCell align="right">{row.clouds}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
