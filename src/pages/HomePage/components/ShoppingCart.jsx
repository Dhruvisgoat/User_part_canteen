import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ShoppingCart } from '@mui/icons-material/';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../../../Context/CartContext';

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

const underlineStyle = {
  textDecoration: 'underline',
};

const ShoppingCartIcon = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { cart } = useCart();

  // Calculate the total count of items in the cart
  const totalCount = cart.reduce((total, item) => total + item.count, 0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate =useNavigate();
  const navigateCart = () => {
    navigate('/home/cart');
  };


  return (
    <div>
      <IconButton
        id="customized-icon-button"
        aria-controls={open ? 'customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={totalCount} color="error"> {/* Display the total count */}
          <ShoppingCart />
        </Badge>
      </IconButton>

      <StyledMenu
        id="customized-menu"
        MenuListProps={{
          'aria-labelledby': 'customized-icon-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem style={underlineStyle} onClick={navigateCart}>Items Added</MenuItem>

        {cart.map((item) => (
            <MenuItem key={item.id} onClick={() => { handleClose(); navigateCart(); }} disableRipple>
            {item.Name} * <b>{item.count}</b>
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};

export default ShoppingCartIcon;
