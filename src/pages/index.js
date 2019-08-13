import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import axios from 'axios';
import CoreLayout from '../layouts/CoreLayout';
import Step from '../components/Step';
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

const IndexPage = () => {
  const typeform = React.useRef(null);
  const [user, setUser] = React.useState(null);
  const [userTried, setUserTried] = React.useState(false);

  React.useEffect(() => {
    api.get('/auth/user')
      .then(res => res.data)
      .then((data) => {
        setUser(data);
        setUserTried(true);
      })
      .catch(() => {
        setUserTried(true);
      })
  }, []);

  if (userTried) {
    return (
      <CoreLayout>
        { user && user.name && <ReactTypeformEmbed
          ref={ typeform }
          url={ TYPEFORM_SURVEY + `?name=${ encodeURIComponent(user.name) }&id=${encodeURIComponent(user.id)}` }
          hideFooter={ true }
          hideHeader={ true }
          popup={ true }
        /> }
        <Text>
          { user && user.name && (
            <div className="row">
              <div className="col-10">
                <h2>
                  Hello, { user.name }!
                </h2>
              </div>
              <div className="col-2">
                <button
                  className="btn btn-link"
                  onClick={() => {
                    Cookies.remove('token');
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
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
        </Text>
        <Step
          stepNumber={ 1 }
          title="Reunion Survey"
          actionText={ () => (
            <button
              className="btn btn-dark"
              onClick={ () => typeform.current.typeform.open() }
              disabled={!user}
            >
              Click to Take the Survey!
            </button>
          )}
          disabled={!user}
          disabledOverlay={(
            <a href={ `${ process.env.GATSBY_API_ENDPOINT }/auth/login` } className="btn btn-primary">
              <i className="fab fa-facebook-square" /> Login via Facebook
            </a>
          )}
          description="Take the survey so we can collect data to make the best reunion possible!"
        />
      </CoreLayout>
    );
  } else {
    return null;
  }
};

export default IndexPage
