import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
    >
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" color="textSecondary" gutterBottom>
        Oops! Page not found
      </Typography>
      <Typography variant="body1" color="textSecondary">
        The page you are looking for might have been removed or is temporarily unavailable.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ marginTop: 20 }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
