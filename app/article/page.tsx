'use client';
import { useContext, useEffect } from 'react';

import { AppContext } from '@/components/AppContext';

const PAGE_TITLE = 'Articles';

export default function About() {
  const { pageTitle, setPageTitle } = useContext(AppContext);

  useEffect(() => {
    if (pageTitle === PAGE_TITLE) return;
    setPageTitle(PAGE_TITLE);
  }, [pageTitle, setPageTitle]);

  return (
    <div>
      <main>Coming soon...</main>
    </div>
  );
}
