import { Helmet } from 'react-helmet-async';

import { env } from '@/constants/env';

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet
      title={title ? `${title} | ${env.VITE_APP_NAME}` : undefined}
      defaultTitle={env.VITE_APP_NAME}
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
