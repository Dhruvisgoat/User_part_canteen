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

  return (
    <StyledContainer>
      <StyledSortButtonGroup>
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
      </StyledSortButtonGroup>

      <StyledCardRowContainer>
        <CardRow title="Specials" sortOption={sortOption}  />
        <CardRow title="Desserts" sortOption={sortOption}  />
        <CardRow title="Salads" sortOption={sortOption}  />
        <CardRow title="Beverages" sortOption={sortOption}  />
        <CardRow title="Appetizers" sortOption={sortOption}  />
        <CardRow title="Sides" sortOption={sortOption}  />
        
        {/* Add more CardRow components for other categories if needed */}
      </StyledCardRowContainer>
    </StyledContainer>
  );
};

export default MenuSection;
