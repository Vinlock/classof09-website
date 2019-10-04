/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

const React = require('react');
const bugsnag = require('@bugsnag/js');
const bugsnagReact = require('@bugsnag/plugin-react');

const bugsnagClient = bugsnag({
  apiKey: process.env.GATSBY_BUGSNAG_API_KEY,
  releaseState: process.env.GATSBY_BUGSNAG_RELEASE_STAGE,
});
bugsnagClient.use(bugsnagReact, React);

const ErrorBoundary = bugsnagClient.getPlugin('react');

exports.wrapRootElement = ({ element }) => {
  return (
    <ErrorBoundary>
      {element}
    </ErrorBoundary>
  );
};
