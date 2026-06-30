'use client';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';

import { AppContext } from './AppContext';

const HeaderContainer = styled('div')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  justifyContent: 'space-between',
  height: '64px',
  padding: theme.spacing(2),
}));

const Header = () => {
  const { pageTitle } = useContext(AppContext);

  return (
    <HeaderContainer>
      <Typography variant="h3"> | {pageTitle}</Typography>
    </HeaderContainer>
  );
};

export default Header;
