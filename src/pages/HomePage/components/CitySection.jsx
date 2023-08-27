import React from 'react';
import { Typography, List, ListItem, ListItemText, Container, Paper, Grid } from '@mui/material';

const CitySection = () => {
  const cityData = [
    { name: 'Mumbai', location: 'Mumbai, India' },
    { name: 'Delhi', location: 'New Delhi, India' },
    { name: 'Bangalore', location: 'Bangalore, India' },
    { name: 'Chennai', location: 'Chennai, India' },
    { name: 'Kolkata', location: 'Kolkata, India' },
    { name: 'Hyderabad', location: 'Hyderabad, India' },
    { name: 'Pune', location: 'Pune, India' },
    { name: 'Ahmedabad', location: 'Ahmedabad, India' },
    { name: 'Jaipur', location: 'Jaipur, India' },
    { name: 'Surat', location: 'Surat, India' },
    { name: 'Lucknow', location: 'Lucknow, India' },
    { name: 'Kanpur', location: 'Kanpur, India' },
    { name: 'Nagpur', location: 'Nagpur, India' },
    { name: 'Patna', location: 'Patna, India' },
    { name: 'Indore', location: 'Indore, India' },
    { name: 'Thane', location: 'Thane, India' },
    { name: 'Bhopal', location: 'Bhopal, India' },
    { name: 'Visakhapatnam', location: 'Visakhapatnam, India' },
    { name: 'Vadodara', location: 'Vadodara, India' },
    { name: 'Firozabad', location: 'Firozabad, India' },
    { name: 'Ludhiana', location: 'Ludhiana, India' },
    { name: 'Rajkot', location: 'Rajkot, India' },
    { name: 'Agra', location: 'Agra, India' },
    { name: 'Siliguri', location: 'Siliguri, India' },
    { name: 'Nashik', location: 'Nashik, India' },
    { name: 'Faridabad', location: 'Faridabad, India' },
    { name: 'Patiala', location: 'Patiala, India' },
    { name: 'Meerut', location: 'Meerut, India' },
    { name: 'Kalyan-Dombivali', location: 'Kalyan-Dombivali, India' },
    { name: 'Vasai-Virar', location: 'Vasai-Virar, India' },
    { name: 'Varanasi', location: 'Varanasi, India' },
    { name: 'Srinagar', location: 'Srinagar, India' },
    // Add more cities as needed
  ];

  const openGoogleMaps = (location) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`);
  };

  return (
    <div style={{ mt: 4 }}>
        <hr></hr>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography align='center' variant="h5" sx={{ marginBottom: 2 }}>
          Our Centers in Indian Cities
        </Typography>
        <Grid container spacing={2}>
          {cityData.map((city, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <ListItem
                button
                onClick={() => openGoogleMaps(city.location)}
                sx={{ '&:hover': { backgroundColor: '#f5f5f5', cursor: 'pointer' } }}
              >
                <ListItemText primary={city.name} />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default CitySection;


