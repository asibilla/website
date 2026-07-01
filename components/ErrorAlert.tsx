'use client';
import { Alert as MuiAlert } from '@mui/material';
import type { FC } from 'react';
import { useCallback, useContext } from 'react';

import { AppContext } from '@/components/AppContext';
import ContentContainer from '@/components/ContentContainer';

const Alert: FC = () => {
  const { error, setError } = useContext(AppContext);
  const message = `Sorry, something went wrong: ${error?.message || 'An error occurred'}`;

  const clearAlert = useCallback(() => {
    setError(null);
  }, [setError]);

  if (!error) {
    return null;
  }

  return (
    <ContentContainer>
      <MuiAlert severity="error" onClose={clearAlert}>
        {message}
      </MuiAlert>
    </ContentContainer>
  );
};

export default Alert;
