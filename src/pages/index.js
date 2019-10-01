import { Typography } from '@material-ui/core';
import React from 'react';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import Stepper from '../components/ReunionStepper';
import CoreLayout from '../layouts/CoreLayout';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { rem } from 'polished';
import { getUser } from '../lib/api';
import SEO from '../components/SEO';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const { GATSBY_TYPEFORM_SURVEY_ID } = process.env;

const queryParamExists = (param) => window.location.search.includes(`${param}=`);

const userIsLoggedIn = () => Boolean(Cookies.get('token'));

const StyledPaper = styled(Paper)`
  padding: ${rem('20px')};
`;

const IndexPage = () => {
  const typeform = React.useRef(null);
  const [user, setUser] = React.useState(null);
  const [userTried, setUserTried] = React.useState(false);

  React.useEffect(() => {
    // Get User Info
    if (userIsLoggedIn()) {
      getUser()
        .then((data) => {
          console.log('user.data', data);
          setUser(data);
        })
        .catch((err) => {
          console.error(err);
          const { status } = err.response;
          if (status === 401 || status === 403) {
            Cookies.remove('token');
          }
        })
        .finally(() => {
          setUserTried(true);
        });
    } else {
      setUserTried(true);
    }
  }, []);

  // Typeform Embed
  const typeformEmbed = () => {
    if (user && user.name) {
      return (
        <ReactTypeformEmbed
          ref={ typeform }
          url={ `https://vinlock1.typeform.com/to/${GATSBY_TYPEFORM_SURVEY_ID}?name=${ encodeURIComponent(user.name) }&id=${encodeURIComponent(user.facebookId)}` }
          hideFooter={ true }
          hideHeader={ true }
          popup={ true }
        />
      );
    }
    return null;
  };

  const openTypeForm = () => typeform.current.typeform.open();

  if (userTried) {
    if (user) {
      let activeStep = 0;

      if (user.surveyDone) {
        activeStep = 2;
      }

      if (user.purchased) {
        activeStep = 2;
      }

      const stats = () => {
        if (user.purchasedTickets > 50) {
          return (
            <Typography>
              <b>{user.totalEntries || 0}</b> Alumni RSVP'd&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<b>{user.purchasedTickets || 0}</b> Tickets Purchased
            </Typography>
          );
        } else {
          return (
            <Typography>
              <b>{user.totalEntries || 0}</b> Alumni RSVP'd
            </Typography>
          );
        }
      };

      return (
        <CoreLayout>
          { typeformEmbed() }
          <SEO title="Home"/>
          <Container maxWidth="md">
            <Grid container spacing={3}>
              <Grid item xs={12} className="center">
                <Button
                  onClick={() => {
                    const apiEndpoint = process.env.GATSBY_API_ENDPOINT;
                    const redirect = encodeURIComponent(window.location.href);
                    window.location = `${apiEndpoint}/rest/auth/logout?redirect=${redirect}`
                  }}
                  color="secondary"
                >
                  Logout
                </Button>
              </Grid>
              <Grid item xs={12} className="text-center">
                <Typography variant="h5">Hello, {user.name}!</Typography>
              </Grid>
            </Grid>
            <div className="text-center">
              {stats()}
            </div>
            <Stepper
              activeStep={ activeStep }
              openTypeForm={ openTypeForm }
            />
          </Container>
        </CoreLayout>
      );
    } else {
      return (
        <CoreLayout>
          <SEO title="Home" />
          <Container maxWidth="md">
            <StyledPaper className="text-center">
              <Typography style={{margin:rem('20px')}}>
                You must login with Facebook before continuing!
              </Typography>
              <Button
                onClick={() => {
                  const apiEndpoint = process.env.GATSBY_API_ENDPOINT;
                  window.location = `${apiEndpoint}/rest/auth/oauth/facebook`;
                }}
                style={{
                  backgroundColor: '#3B5998',
                  color: '#FFF',
                }}
              >
                <i className="fab fa-facebook-square"/>&nbsp;&nbsp;Login via Facebook
              </Button>
              <Typography style={{margin:rem('20px')}}>
                <small>If you do not have a facebook account, email us at <a href="mailto:contact@classof09.org">contact@classof09.org</a> with your full name.</small>
              </Typography>
            </StyledPaper>
          </Container>
        </CoreLayout>
      );
    }
  }
  return null;
};

export default IndexPage;