import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom'; // Import Link
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from '../../../config/firebase';
import { signOut, getAuth } from 'firebase/auth';
import { useEffect } from 'react';


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const ProfileAvatar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    try {
        await signOut(auth);
        console.log('User logged out');
        // Perform any additional logout actions if needed
        navigate('/');
    } catch (error) {
        console.log(error);
    }
};

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [username, setUsername] = useState('');

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
              setUsername(user.displayName); // Retrieve the username from the user object
          } else {
              setUsername('');
          }
      });

      return () => {
          unsubscribe();
      };
  }, []);



  return (
    <div>
      <Avatar
        id="customized-avatar"
        aria-controls={open ? 'customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        src="/path/to/avatar-image.jpg"
        sx={{ cursor: 'pointer' }}
      />
      <StyledMenu
        id="customized-menu"
        MenuListProps={{
          'aria-labelledby': 'customized-avatar',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/home/profile" onClick={handleClose} disableRipple>
          <PersonIcon />
          {username && <span className="username">{username}</span>}
        </MenuItem>
        <MenuItem component={Link} to="/home/settings" onClick={handleClose} disableRipple>
          <SettingsIcon />
          Settings
        </MenuItem>
        <MenuItem  onClick={handleLogout} disableRipple>
        <LogoutIcon />
          Logout
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default ProfileAvatar;
