import React, { useState } from 'react';
import { Container, Typography, FormControlLabel, Switch, Divider, TextField, Button } from '@mui/material';

const UserSettings = () => {
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');

  const handleNotificationToggle = () => {
    setReceiveNotifications(!receiveNotifications);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleSaveChanges = () => {
    // Perform saving changes to a backend or local storage
    // You can update the user's preferences, such as name and email, here
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        User Settings
      </Typography>
      <Divider />

      <FormControlLabel
        control={<Switch checked={receiveNotifications} onChange={handleNotificationToggle} />}
        label="Receive Notifications"
        style={{ marginTop: '1rem' }}
      />

      <FormControlLabel
        control={<Switch checked={darkMode} onChange={handleDarkModeToggle} />}
        label="Dark Mode"
        style={{ marginTop: '1rem' }}
      />

      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button variant="contained" color="primary" onClick={handleSaveChanges} style={{ marginTop: '1rem' }}>
        Save Changes
      </Button>
    </Container>
  );
};

export default UserSettings;
