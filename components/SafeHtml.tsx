import DOMPurify from 'dompurify';
import type { FC } from 'react';

const SafeHtmlComponent: FC<{ dirtyHtml: string }> = ({ dirtyHtml }) => {
  const cleanHtml = DOMPurify.sanitize(dirtyHtml, {
    ALLOWED_TAGS: [
      'b',
      'br',
      'em',
      'i',
      'li',
      'ol',
      'p',
      'span',
      'strong',
      'ul',
    ],
    ALLOWED_ATTR: [],
  });

  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};

export default SafeHtmlComponent;
