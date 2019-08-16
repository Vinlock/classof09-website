import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import axios from 'axios';
import CoreLayout from '../layouts/CoreLayout';
import Step from '../components/Step';
import SEO from '../components/SEO';
import Cookies from 'js-cookie';

const TYPEFORM_SURVEY = 'https://vinlock1.typeform.com/to/CWy6cX';

const api = axios.create({
  baseURL: process.env.GATSBY_API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
});

const Text = styled.div`
  text-align: left;
  max-width: ${rem('500px')};
  margin: ${rem('20px')} auto;
  padding: ${rem('15px')};
  p {
    margin: ${rem('10px')} auto;
  }
`;

const SmallText = styled.div`
  font-size: ${rem('15px')};
`;

const Row = styled.div`
  margin: 0 !important;
`;

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
      api.get('/auth/user')
        .then(res => res.data)
        .then((data) => {
          setUser(data);
          setUserTried(true);
          setSurveyStatus(data.surveyDone);
        })
        .catch((err) => {
          setUserTried(true);
          if (err.response.status === 401) {
            Cookies.remove('token');
          }
        })
    } else {
      setUserTried(true);
    }
  }, []);

  let disabledOverlay = (
    <a href={ `${ process.env.GATSBY_API_ENDPOINT }/auth/login` } className="btn btn-primary">
      <i className="fab fa-facebook-square" /> Login via Facebook
    </a>
  );

  if (user && (surveyComplete || (user && user.surveyDone))) {
    disabledOverlay = (
      <>
        <div>
          <div>You have completed the survey!</div>
          <SmallText>Once we finish collecting all of the data, we will begin ticket sales.</SmallText>
        </div>
      </>
    );
  }


  if (userTried) {
    return (
      <CoreLayout>
        { user && user.name && <ReactTypeformEmbed
          ref={ typeform }
          url={ TYPEFORM_SURVEY + `?name=${ encodeURIComponent(user.name) }&id=${encodeURIComponent(user.fbId)}` }
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
                  href={`${ process.env.GATSBY_API_ENDPOINT }/auth/logout?redirect=${encodeURIComponent(window.location.href)}`}
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
          <h3 className="text-right">{(user && user.totalEntries) || 0} alumni answered.</h3>
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
          disabledOverlay={disabledOverlay}
          description="Take the survey so we can collect data to make the best reunion possible!"
        />
      </CoreLayout>
    );
  } else {
    return null;
  }
};

export default IndexPage
