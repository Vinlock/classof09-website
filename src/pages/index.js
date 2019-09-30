import React from 'react';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import axios from 'axios';
import CoreLayout from '../layouts/CoreLayout';
import Step from '../components/Step';
import SEO from '../components/SEO';
import SmallText from '../components/SmallText';
import Text from '../components/Text';
import Row from '../components/Row';
import Container from '../components/Container';
import Cookies from 'js-cookie';

const { GATSBY_TYPEFORM_SURVEY_ID } = process.env;

const api = axios.create({
  baseURL: process.env.GATSBY_API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
  withCredentials: true,
});

console.log('token', Cookies.get('token'));

const IndexPage = () => {
  const typeform = React.useRef(null);
  const [user, setUser] = React.useState(null);
  const [userTried, setUserTried] = React.useState(false);
  const [surveyComplete, setSurveyStatus] = React.useState(false);

  React.useEffect(() => {
    if (window.location.search.includes('c=')) {
      Cookies.set('typeform_done', true);
      window.location.search = '';
    }
    if (Cookies.get('typeform_done')) {
      setSurveyStatus(true);
    }
  }, []);

  React.useEffect(() => {
    if (Cookies.get('token')) {
      api.get('/rest/auth/user', {
        params: { surveyId: GATSBY_TYPEFORM_SURVEY_ID },
      })
        .then(res => res.data)
        .then((data) => {
          setUser(data);
          setUserTried(true);
          setSurveyStatus(data.surveyDone);
        })
        .catch((err) => {
          console.error(err);
          setUserTried(true);
          if (err.response.status === 401) {
            Cookies.remove('token');
          }
        })
    } else {
      setUserTried(true);
    }
  }, []);


  if (userTried) {
    return (
      <CoreLayout>
        { user && user.name && <ReactTypeformEmbed
          ref={ typeform }
          url={ `https://vinlock1.typeform.com/to/${GATSBY_TYPEFORM_SURVEY_ID}?name=${ encodeURIComponent(user.name) }&id=${encodeURIComponent(user.facebookId)}` }
          hideFooter={ true }
          hideHeader={ true }
          popup={ true }
        /> }
        <SEO title="Home" />
        <Text>
          { user && user.name && (
            <Row className="row">
              <div className="col-10">
                <h2>
                  Hello, { user.name }!
                </h2>
              </div>
              <div className="col-2">
                <a
                  className="btn btn-link"
                  href={`${ process.env.GATSBY_API_ENDPOINT }/rest/auth/logout?redirect=${encodeURIComponent(window.location.href)}`}
                >
                  Logout
                </a>
              </div>
            </Row>
          )}
          <p>
            Welcome to the home page for the Class of 2009 10 Year High School Reunion.
          </p>
          <p>
            Complete all of the following below!
          </p>
          {!user && (
            <>
              <p>
                You must login with Facebook before continuing!
              </p>
              <small>If you do not have a facebook account, email us at <a href="mailto:contact@classof09.org">contact@classof09.org</a> with your full name.</small>
            </>
          )}
          <br />
          <br />
          <h3 className="text-right">{(user && `${user.totalEntries || 0} alumni attendance confirmed.`)}</h3>
        </Text>
        <Step
          stepNumber={ 1 }
          title="Reunion Survey"
          actionText={ () => (
            <button
              className="btn btn-dark"
              onClick={ () => typeform.current.typeform.open() }
              disabled={!user || surveyComplete}
            >
              Click to Take the Survey!
            </button>
          )}
          disabled={!user || (user && user.surveyDone)}
          disabledOverlay={() => {
            const disabledOverlay = (
              <a href={ `${ process.env.GATSBY_API_ENDPOINT }/rest/auth/oauth/facebook` } className="btn btn-primary">
                <i className="fab fa-facebook-square"/> Login via Facebook
              </a>
            );

            if (user && (surveyComplete || (user && user.surveyDone))) {
              return (
                <>
                  <div>
                    <div>You have completed the survey!</div>
                    <SmallText>Once we finish collecting all of the data, we will begin ticket sales.</SmallText>
                  </div>
                </>
              );
            }

            return disabledOverlay;
          }}
          description="Take the survey so we can collect data to make the best reunion possible!"
        />
        <Container className="row">
          <h2>Purchase Tickets</h2>
        </Container>
      </CoreLayout>
    );
  } else {
    return null;
  }
};

export default IndexPage
