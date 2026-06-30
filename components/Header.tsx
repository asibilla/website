'use client';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';

import { AppContext } from './AppContext';
import HideOnScroll from './HideOnScroll';
import HomeButton from './HomeButton';
import NavigationMenu from './NavigationMenu';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
  minHeight: theme.spacing(8),
  padding: theme.spacing(2),
  width: '100%',
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

const RightSideContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginLeft: 'auto',
}));

const Header = () => {
  const { pageTitle } = useContext(AppContext);

  return (
    <HideOnScroll>
      <StyledAppBar position="fixed">
        <StyledToolbar>
          <LeftSideContainer>
            <HomeButton />
            <PageTitleContainer>
              <Typography variant="h3">
                <span>{pageTitle}</span>
              </Typography>
            </PageTitleContainer>
          </LeftSideContainer>
          <RightSideContainer>
            <NavigationMenu />
          </RightSideContainer>
        </StyledToolbar>
      </StyledAppBar>
    </HideOnScroll>
  );
};

export default Header;
