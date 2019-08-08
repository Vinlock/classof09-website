import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'
import Image from '../components/Image'
import CoreLayout from '../layouts/CoreLayout'
import Step from '../components/Step'

const ImageContainer = styled.div`
  text-align: center;
  width: 100%;
  margin-bottom: ${rem('50px')};
`;

const StyledImage = styled(Image)`
  margin: 0 auto;
  max-width: ${rem('500px')};
`;

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
      <ImageContainer>
        <StyledImage image="ecr_banner" />
      </ImageContainer>
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
        title="Date Survey"
        actionText={() => {
          return (
            <a className="typeform-share button btn btn-dark"
               href="https://vinlock1.typeform.com/to/CWy6cX"
               data-mode="popup"
               target="_blank">
              Take the Survey!
            </a>
          );
        }}
        description="Pick the event dates that are most convenient for you!"
      />
    </CoreLayout>
  );
};

export default IndexPage
