import React from 'react';
import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';

const bugsnagClient = bugsnag({
  apiKey: process.env.GATSBY_BUGSNAG_API_KEY,
  releaseState: process.env.GATSBY_BUGSNAG_RELEASE_STAGE,
});

bugsnagClient.use(bugsnagReact, React);

export default bugsnagClient;
