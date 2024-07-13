import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import '../App.css'

const drawerWidth = 240;

export default function Sidebar() {
  const handleNavigation = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <List>
        <ListItem button onClick={() => handleNavigation('app')}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('variable')}>
          <ListItemText primary="Variables Meteorológicas" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('graph')}>
          <ListItemText primary="Gráfico Precipitación, Humedad y Nubosidad" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('data_Table')}>
          <ListItemText primary="Tabla de datos" />
        </ListItem>
        
      </List>
    </Drawer>
  );
}
