import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function HamburgerMenu() {
  // State to track if the menu is open and what element it is anchored to
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  // Functions to handle opening and closing the dropdown
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* The Hamburger Icon Button */}
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuClick}
      >
        <MenuIcon />
      </IconButton>

      {/* The Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuClose}>Link 1</MenuItem>
        <MenuItem onClick={handleMenuClose}>Link 2</MenuItem>
        <MenuItem onClick={handleMenuClose}>Link 3</MenuItem>
      </Menu>
    </div>
  );
}
