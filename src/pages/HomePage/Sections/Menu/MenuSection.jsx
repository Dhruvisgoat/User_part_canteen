import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CardRow from './Cardrow';
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
      <Typography variant="h2" sx={{ textAlign: 'center' }}>TODAY'S MENU</Typography>
      <hr></hr>
      <StyledSortButtonGroup sx={{ marginTop: "20px", height: '10px', justifyContent: 'flex-end', display: 'flex', }}>
        <Sort sx={{ margin: '10px' }} />
        <StyledSortButton
          startIcon={<MenuBookIcon />}
          onClick={() => setSortOption('name')}
        >
          Name
        </StyledSortButton>
        <StyledSortButton
          startIcon={<MonetizationOnIcon />}
          onClick={() => setSortOption('price')}
        >
          Price
        </StyledSortButton>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </StyledSortButtonGroup>
      <div style={{ textAlign: 'center' }}>

      </div>
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
