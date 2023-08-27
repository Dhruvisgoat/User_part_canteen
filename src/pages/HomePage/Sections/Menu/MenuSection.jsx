import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CardRow from './Cardrow'; 
import Button from '@mui/material/Button';

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

  const sortFoodItems = (sortBy) => {
    setSortOption(sortBy);
    // Implement your sorting logic here
  };

  return (
    <StyledContainer>
      <StyledSortButtonGroup>
        <StyledSortButton
          variant={sortOption === 'name' ? 'contained' : 'text'}
          startIcon={<MenuBookIcon />}
          onClick={() => sortFoodItems('name')}
        >
          Name
        </StyledSortButton>
        <StyledSortButton
          variant={sortOption === 'price' ? 'contained' : 'text'}
          startIcon={<MonetizationOnIcon />}
          onClick={() => sortFoodItems('price')}
        >
          Price
        </StyledSortButton>
        <StyledSortButton
          variant={sortOption === 'quantity' ? 'contained' : 'text'}
          startIcon={<LocalMallIcon />}
          onClick={() => sortFoodItems('quantity')}
        >
          Quantity
        </StyledSortButton>
      </StyledSortButtonGroup>

      <StyledCardRowContainer>
        <CardRow title="Specials" />
        <CardRow title="Desserts" />
        <CardRow title="Salads" />
        {/* Add more CardRow components for other categories if needed */}
      </StyledCardRowContainer>
    </StyledContainer>
  );
};

export default MenuSection;
