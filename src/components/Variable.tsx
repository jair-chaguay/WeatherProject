import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Toolbar className="header">
      <Typography variant="h4"  color="text.secondary" noWrap>
        Variables Meteorológicas
      </Typography>
    </Toolbar>
  );
}