import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Toolbar className="header">
      <Typography variant="h4" fontWeight="bold" color="primary" noWrap>
        Dashboard - Ecuador
      </Typography>
    </Toolbar>
  );
}
