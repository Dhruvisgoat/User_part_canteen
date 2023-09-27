import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CardRow from './Cardrow.jsx';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Sort } from '@mui/icons-material';

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledSortButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(3),
}));

const StyledSortButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginRight: theme.spacing(1),
}));

const StyledCardRowContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const MenuSection = () => {

  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <StyledContainer>
      <h1 style={{ textAlign: 'center' }}>🍕🌮 OUR MENU 🍔🍦</h1>
      <hr></hr>

      <StyledSortButtonGroup sx={{ marginTop: "20px", height: '10px', justifyContent: 'flex-end', display: 'flex' }}>

        <StyledSortButton
          startIcon={<MenuBookIcon />}
          onClick={() => setSortOption('name')}

          sx={{fontFamily:'Oswald',padding:'7px'}}
        >
          Name
        </StyledSortButton>
        <StyledSortButton
          startIcon={<MonetizationOnIcon />}
          onClick={() => setSortOption('price')}
          sx={{fontFamily:'Oswald',padding:'7px'}}
          size="small"
        >
          Price
        </StyledSortButton>
        <TextField
          
          label=" 🕵🏻 Search"
          variant='standard'
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{'& label': {
            fontFamily: 'Oswald',
          },'& input': {
            fontFamily: 'Oswald',
          }, padding:'6px'}}
        />
      </StyledSortButtonGroup>

      <StyledCardRowContainer>
        <CardRow title="Specials" sortOption={sortOption} searchQuery={searchQuery} />
        <CardRow title="Desserts" sortOption={sortOption} searchQuery={searchQuery} />
        <CardRow title="Salads" sortOption={sortOption} searchQuery={searchQuery} />
        <CardRow title="Beverages" sortOption={sortOption} searchQuery={searchQuery} />
        <CardRow title="Appetizers" sortOption={sortOption} searchQuery={searchQuery} />
        <CardRow title="Sides" sortOption={sortOption} searchQuery={searchQuery} />

        {/* Add more CardRow components for other categories if needed */}
      </StyledCardRowContainer>
    </StyledContainer>
  );
};

export default MenuSection;
