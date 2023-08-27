import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu'; // Import the Menu icon
import MenuBookIcon from '@mui/icons-material/MenuBook'; // Add the icon import
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; // Add the icon import
import ReceiptIcon from '@mui/icons-material/Receipt'; // Add the icon import
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'; // Add the icon import
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Add the icon import
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // Add the icon import
import {useNavigate} from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings'; // Add the icon import
export default function TemporaryDrawer() {
  const navigate =useNavigate();

  const [state, setState] = React.useState({
    left: false, // Only need the 'left' anchor for this example
  });

  const toggleDrawer =
    (anchor) =>
    (event) => {
      if (
        event.type === 'keydown' &&
        ((event.key === 'Tab' ||
          event.key === 'Shift'))
      ) {
        return;
      }

      setState({ ...state, [anchor]: !state[anchor] });
    };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    
      <List>
          {[
            { text: 'Menu', icon: <MenuBookIcon />,route:"/menu",route:"/home/menu" }, // Use the imported icon
            { text: 'Cart', icon: <ShoppingCartOutlinedIcon />,route:"/home/cart" }, // Use the imported icon
            { text: 'Orders', icon: <ReceiptIcon />,route:"/home/orders" }, // Use the imported icon
            { text: 'Notifications', icon: <NotificationsNoneIcon /> ,route:"/home/notifications"}, // Use the imported icon
            { text: 'Profile', icon: <AccountCircleIcon />,route:"/home/profile" }, // Use the imported icon
            { text: 'Delivery', icon: <LocalShippingIcon />,route:"/home/delivery" }, // Use the imported icon
            { text: 'Settings', icon: <SettingsIcon />,route:"/home/settings" }, // Use the imported icon
          ].map((item, index) => (
            <ListItem 
            key={item.text} 
            disablePadding sx={{ display: 'block' }} 
            onClick={()=>navigate(item.route)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('left', true)} sx={{color:'white'}}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor="left"
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </div>
  );
}
