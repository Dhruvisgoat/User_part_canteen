import React from 'react';
import { useCart } from '../../../../Context/CartContext';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CartEmpty from './CartEmpty';
import { useNavigate } from 'react-router-dom';

const CartSection = () => {
  const { handleClearCart, cart, handleAddToCart, handleSubtractToCart } = useCart();

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + parseFloat(item.Price) * item.count, 0);
  };
  const navigate=useNavigate();
  const navigateCheckout = () => {
    navigate('/home/checkout');
  }

  return (
    <div className="cart-section" style={{ textAlign: 'center' }}>
      <Divider />
      <div className="cart-items">
        {cart.length === 0 ? (
          <CartEmpty />
        ) : (
          <div>
            <Typography variant='h4' style={{ margin: '40px 0px 0px 0px' }}>Cart </Typography>
            {cart.map((item) => (
              <Card key={item.id} sx={{ my: 2, mx: 'auto', width: '90%' }}>
                <CardContent>
                  <Typography variant="h6" mt={2}>
                    {item.Name}
                  </Typography>
                  <Typography variant="body1">Price: Rs. {item.Price}.00</Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={() => handleSubtractToCart(item.id)}
                    startIcon={<RemoveIcon />}
                    style={{ backgroundColor: "#125c79" }}
                  />
                  <Button sx={{ border: '1px solid black', padding: '2px', margin: '10px' }} > X {item.count} </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleAddToCart(item)}
                    endIcon={<AddIcon />}
                    style={{ backgroundColor: "#257090" }}
                  />
                </CardActions>
              </Card>
            ))}
            {cart.length > 0 && ( // Add this condition to prevent rendering when cart is empty
              <div>
                <Divider />
                <div className="cart-total" style={{ margin: '0px 0px 30px 0px' }}>
                  <Typography variant="h6" mt={2}>
                    Total Price: Rs. {calculateTotalPrice()}.00
                  </Typography>
                  <div style={{marginTop:'15px'}}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClearCart}
                      style={{ margin: '0px 10px 0px 10px' }}>
                      Empty Cart
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={navigateCheckout}
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSection;
