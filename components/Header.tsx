'use client';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';

import { AppContext } from './AppContext';
import HideOnScroll from './HideOnScroll';
import HomeButton from './HomeButton';

const HeaderContainer = styled('header')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  justifyContent: 'space-between',
  height: '64px',
  padding: theme.spacing(2),
}));

const LeftSideContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const PageTitleContainer = styled('div')(({ theme }) => ({
  borderLeft: `1px solid #fff`,
  paddingLeft: theme.spacing(2),
}));

const Header = () => {
  const { pageTitle } = useContext(AppContext);

  return (
    <HideOnScroll>
      <AppBar position="fixed">
        <HeaderContainer>
          <Toolbar>
            <LeftSideContainer>
              <HomeButton />
              <PageTitleContainer>
                <Typography variant="h3">
                  <span>{pageTitle}</span>
                </Typography>
              </PageTitleContainer>
            </LeftSideContainer>
          </Toolbar>
        </HeaderContainer>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
