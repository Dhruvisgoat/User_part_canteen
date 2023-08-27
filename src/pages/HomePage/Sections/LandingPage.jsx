import React from 'react';
import { Container, Typography, Link, Paper, Grid } from '@mui/material';
import OnlineOrdering from '../../../assets/OnlineOrdering.png';
import OrderTracking from '../../../assets/OrderTracking.png';
import ContactlessPayment from '../../../assets/ContactlessPayment.png';

const landingPageStyles = {
  fontFamily: 'Arial, sans-serif',
  textAlign: 'center',
};

const headerStyles = {
  backgroundColor: '#6282BC',
  color: 'white',
  padding: '100px 0',
};

const canteenAppHeaderStyles = {
  fontSize: '72px', // Increased font size
  fontWeight: 'bold',
  marginBottom: '10px',
};

const canteenAppSubHeaderStyles = {
  fontSize: '32px', // Increased font size
  color: '#f0f0f0',
  marginBottom: '40px',
};

const ctaButtonStyles = {
  display: 'inline-block',
  padding: '10px 20px',
  fontSize: '32px',
  backgroundColor: '#f0f0f0',
  color: '#6282BC',
  textDecoration: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
};

const ctaButtonHoverStyles = {
  transition: 'background-color 0.3s, color 0.3s',
  ':hover': {
    backgroundColor: '#6282BC',
    color: 'white',
  },
};

const featuresSectionStyles = {
  padding: '40px 0',
};

const featureCardStyles = {
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '20px',
  margin: '20px',
  maxWidth: '600px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  height: '100%',
};

const featureImageStyles = {
  width: '100%', // Adjust image size
  marginBottom: '30px',
};

const LandingPage = () => {
  return (
    <div style={landingPageStyles}>
      <Paper style={headerStyles}>
        <Container maxWidth="md">
          <Typography variant="h1" style={canteenAppHeaderStyles}>
            Canteen App
          </Typography>
          <Typography variant="h4" style={canteenAppSubHeaderStyles}>
            Your Convenient Canteen Management Solution
          </Typography>
          <Link href="#features" underline="none" sx={{ ...ctaButtonStyles, ...ctaButtonHoverStyles }}>
            Explore Features
          </Link>
        </Container>
      </Paper>

      <Container maxWidth="md" style={featuresSectionStyles} id="features">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={featureCardStyles}>
              <img src={OnlineOrdering} alt="Feature 1" style={featureImageStyles} />
              <Typography variant="h5">Online Ordering and Menu Management</Typography>
              <Typography variant="body1">
                Browse our menu, customize your order, and enjoy a seamless online ordering experience.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={featureCardStyles}>
              <img src={OnlineOrdering} alt="Feature 1" style={featureImageStyles} />
              <Typography variant="h5">Online Ordering and Menu Management</Typography>
              <Typography variant="body1">
                Browse our menu, customize your order, and enjoy a seamless online ordering experience.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={featureCardStyles}>
              <img src={OnlineOrdering} alt="Feature 1" style={featureImageStyles} />
              <Typography variant="h5">Online Ordering and Menu Management</Typography>
              <Typography variant="body1">
                Browse our menu, customize your order, and enjoy a seamless online ordering experience.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={featureCardStyles}>
              <img src={OnlineOrdering} alt="Feature 1" style={featureImageStyles} />
              <Typography variant="h5">Online Ordering and Menu Management</Typography>
              <Typography variant="body1">
                Browse our menu, customize your order, and enjoy a seamless online ordering experience.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={featureCardStyles}>
              <img src={OrderTracking} alt="Feature 2" style={featureImageStyles} />
              <Typography variant="h5">Contactless Payments</Typography>
              <Typography variant="body1">
                Go cashless with our digital wallet. Load funds, make secure payments, and earn rewards.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={featureCardStyles}>
              <img src={ContactlessPayment} alt="Feature 3" style={featureImageStyles} />
              <Typography variant="h5">Order Tracking and Notifications</Typography>
              <Typography variant="body1">
                Stay updated with real-time order tracking and receive notifications at every step of your meal's journey.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LandingPage;
