import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'
import CoreLayout from '../layouts/CoreLayout'
import Step from '../components/Step'

const Text = styled.div`
  text-align: center;
  max-width: ${rem('500px')};
  margin: ${rem('20px')} auto;
  padding: ${rem('15px')};
  p {
    margin: ${rem('10px')} auto;
  }
`;

const IndexPage = () => {
  return (
    <CoreLayout>
      <Text>
        <p>
          Welcome to the home page for the Class of 2009 10 Year High School Reunion.
        </p>
        <p>
          Complete all of the following below!
        </p>
      </Text>
      <Step
        stepNumber={1}
        title="Reunion Survey"
        actionText={() => {
          return (
            <a className="typeform-share button btn btn-dark"
               href="https://vinlock1.typeform.com/to/CWy6cX"
               data-mode="popup"
               target="_blank">
              Click to Take the Survey!
            </a>
          );
        }}
        description="Take the survey so we can collect data to make the best reunion possible!"
      />
    </CoreLayout>
  );
};

export default IndexPage
