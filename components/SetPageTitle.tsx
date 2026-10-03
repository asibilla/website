'use client';
import { useContext, useEffect } from 'react';
import type { FC } from 'react';

import { AppContext } from '@/components/AppContext';

const SetPageTitle: FC<{ pageName: string }> = ({ pageName }) => {
  const { pageTitle, setPageTitle } = useContext(AppContext);

  useEffect(() => {
    if (pageTitle === pageName) return;
    setPageTitle(pageName);
  }, [pageTitle, pageName, setPageTitle]);

  return null;
};

export default SetPageTitle;
