import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { useState } from 'react';

import { useReferenceData } from '@/hooks/useReferenceData';
import type { ReferenceDataResponseItem } from '@/types';

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    border: `2px solid ${theme.palette.divider}`,
    minWidth: theme.spacing(28),
  },
  '& ul': {
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },
  '& .MuiMenuItem-root': {
    justifyContent: 'center',
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function HamburgerMenu() {
  const { articleTypes } = useReferenceData();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="menu"
        edge="end"
        onClick={handleMenuClick}
      >
        <MenuIcon />
      </IconButton>

      <StyledMenu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClose={handleMenuClose}
        open={open}
        style={{ minWidth: '200px' }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {articleTypes.map((articleType: ReferenceDataResponseItem) => (
          <MenuItem
            key={articleType.key}
            component={Link}
            href={articleType.key === 'homepage' ? '/' : `/${articleType.key}`}
            onClick={handleMenuClose}
          >
            {articleType.label}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}
