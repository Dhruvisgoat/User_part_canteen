import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import ProfileAvatar from './components/ProfileAvatar';
import NotificationsIcon from './components/Notifications';
import ShoppingCartIcon from './components/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import HomeIcon from './components/HomeIcon';
import TemporaryDrawer from './components/TemporaryDrawer';
import MenuSection from './Sections/Menu/MenuSection';
import CartSection from './Sections/Cart/CartSection';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './Sections/LandingPage';
import Footer from './components/Footer';
import OrdersSection from './Sections/Orders/OrderSection';
import ProfileSection from './Sections/Profile/ProflieSection';
import NotificationsSection from './Sections/Notification/NotificationSection';
import DeliverySection from '../Delivery/Delivery';
import { auth } from '../../config/firebase';
import { useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import Checkout from '../Checkout/components/Checkout';
import CitySection from './components/CitySection';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { IconButton } from '@mui/material';
import UserSettings from './Sections/Setting/UserSettings';
import { AddressProvider } from '../Checkout/components/context/adresscontext';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({

    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode === 'true';
  });
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  const theme2 = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const RedirectToSignIn = () => {
    navigate('/');
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const [toggleSidebar, setToggleSidebar] = useState(false);

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ThemeProvider theme={theme2}>
        {loggedIn ?
          <Box >
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ backgroundColor: '#257090', zIndex: '1' }}>
              <Toolbar>
                <TemporaryDrawer />
                <ProfileAvatar />
                <div style={{ flexGrow: 1 }} /> {/* Spacing between items */}
                <HomeIcon />
                <NotificationsIcon />
                <ShoppingCartIcon />
                <IconButton onClick={toggleDarkMode}>
                  {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>

              </Toolbar>
            </AppBar>

            <DrawerHeader />
            <AddressProvider>

              <Box component="main" sx={{ flexGrow: 1, minWidth: '100%' }}>
                <Box sx={{ minHeight: '100vh' }}>
                  <Routes >
                    <Route path="/" element={<LandingPage />}></Route>
                    <Route path="/cart" element={<CartSection />}></Route>
                    <Route path="/menu" element={<MenuSection />}></Route>
                    <Route path="/orders" element={<OrdersSection />}></Route>
                    <Route path="/profile" element={<ProfileSection />}></Route>
                    <Route path="/notifications" element={<NotificationsSection />}></Route>
                    <Route path="/delivery" element={<DeliverySection />}></Route>
                    <Route path="/checkout" element={<Checkout />}></Route>
                    <Route path="/settings" element={<UserSettings />}></Route>
                  </Routes>
                </Box>

                <CitySection />
                <Footer></Footer>
              </Box>
            </AddressProvider>

          </Box>
          :
          <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Sign In
            </Typography>
            <Typography variant="body1" align="center" sx={{ marginBottom: 4 }}>
              Please sign in to access the content.
            </Typography>
            <Button variant="contained" onClick={RedirectToSignIn}>
              Sign In
            </Button>
          </Container>
        }
      </ThemeProvider>
    </div>


  );
}








