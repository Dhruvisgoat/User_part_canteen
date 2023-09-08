import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { Link } from 'react-router-dom';
import { AddressProvider } from './context/adresscontext';
import {db,auth} from '../../../config/firebase'
import { collection } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
//import from cartContext
import { CartContext } from '../../../Context/CartContext';
import { useContext } from 'react';
import { useAddress } from './context/adresscontext';


const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {

  const { cart, handleClearCart,totalPrice } = useContext(CartContext);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const navigateHome = () => {
    useNavigate("/home");
  }

  const {state} = useAddress(); // Access the address fields from the shared state

  //handlePlaceOrder
  const handlePlaceOrder = async () => {
    if (!orderPlaced) { // Check if the order hasn't been placed yet
      // Create an order object
      const order = {
        Cart:cart, 
        TotalPrice: totalPrice(),
        orderDate: new Date(), 
        orderId: Math.floor(Math.random() * 1000000), // Add a random order ID (optional)
        orderedBy:{
          email:auth.currentUser.email,
          name:auth.currentUser.displayName,
        }
      };
  
      const OrderUserRef = collection(db, `Users/${auth.currentUser.email}/orders`);//save to the user's orders database
      const OrderRef = collection(db, `Orders`);//save to the orders collection of the entire database so that it can be managed by the admin as well 
  
      try {
        await addDoc(OrderRef, order);
        await addDoc(OrderUserRef, order);
        handleClearCart();
        setOrderPlaced(true); // Set the orderPlaced state to true
        setActiveStep(activeStep + 1);
      } catch (error) {
        console.error('Error placing order: ', error);
      }
    }
  };

  return (
    <AddressProvider>
      <>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: 'relative',
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          {/* Add your AppBar content here */}
        </AppBar>
        <Container component="main" maxWidth="sm" sx={{ mb: 4, height: '1000px' }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order has
                    shipped.
                  </Typography>
                  <Link to="/home">
                    Back To home
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={activeStep === steps.length - 1 ? handlePlaceOrder : handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </Container>
      </>
    </AddressProvider >

  );
}
