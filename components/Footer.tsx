'use client';
import ContentContainer from './ContentContainer';
import { Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <ContentContainer
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Typography variant="body2">
          ©2026 Andy Sibilla. All rights reserved.
        </Typography>
      </ContentContainer>
    </footer>
  );
};

export default Footer;
