import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface WeatherCardProps {
  title: string;
  value: string;
  percentage: string;
}

export default function WeatherCard({ title, value, percentage }: WeatherCardProps) {
  return (
    <Card className="weatherCard">
      <CardContent>
        <Typography variant="h5" component="div">{title}</Typography>
        <Typography variant="h4" component="div">{value}</Typography>
        <Typography variant="body2" color="text.secondary">{percentage} Este Mes</Typography>
      </CardContent>
    </Card>
  );
}
