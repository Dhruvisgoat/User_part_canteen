import React, { useState } from 'react';
import { Paper, Typography, TextField, FormControl, RadioGroup, Radio, FormControlLabel, Button, Box } from '@mui/material';

const DeliverySection = () => {
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [alternateContact, setAlternateContact] = useState('');
  const [alternateAddress, setAlternateAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');

  const handleDeliveryMethodChange = (event) => {
    setDeliveryMethod(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Save delivery information to your database or perform actions
    console.log('Delivery information:', {
      contact,
      address,
      alternateContact,
      alternateAddress,
      deliveryMethod,
    });
  };
  const applystyle = {
    marginBottom: '10px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const textFieldStyle = {
    width: '100%', // Set the width to 100%
    marginBottom: '10px', // Adjust margin if needed
  };
  const buttonStyle = {
    width: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto', // Center the button
  };

  return (
    <Paper sx={{ padding: 3, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: '1200px', p: 3 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Delivery Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <div style={applystyle}>
            <TextField label="Contact Number" variant="outlined" value={contact} onChange={(e) => setContact(e.target.value)} style={textFieldStyle} inputProps={{ inputMode: 'tel' }} />
          </div>
          <div style={applystyle}>
            <TextField label="Delivery Address" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} multiline style={textFieldStyle} />
          </div>
          <div style={applystyle}>
            <TextField label="Alternate Contact Number" variant="outlined" value={alternateContact} onChange={(e) => setAlternateContact(e.target.value)} style={textFieldStyle}   inputProps={{ inputMode: 'tel' }}  />
          </div>
          <div style={applystyle}>
            <TextField label="Alternate Address" variant="outlined" value={alternateAddress} onChange={(e) => setAlternateAddress(e.target.value)} multiline style={textFieldStyle} />
          </div>
          <FormControl component="fieldset" style={applystyle}>
            <Typography variant="body2">Choose Delivery Method:</Typography>
            <RadioGroup row value={deliveryMethod} onChange={handleDeliveryMethodChange}>
              <FormControlLabel value="pickup" control={<Radio />} label="Pick Up" />
              <FormControlLabel value="delivery" control={<Radio />} label="Delivery" />
            </RadioGroup>
          </FormControl>
          <div style={buttonStyle}>
            <Button variant="contained" color="primary" type="submit" sx={{ width: '100%' }}>
              Confirm Delivery
            </Button>
          </div>
        </form>
      </Box>
    </Paper>
  );
};

export default DeliverySection;
