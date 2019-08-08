import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'
import Image from '../Image';

const Container = styled.div`
  width: 100%;
  text-align: center;
  opacity: 0.5;
  font-size: ${rem('12px')};
  margin: ${rem('50px')} auto;
`;

const StyledImage = styled(Image)`
  width: ${rem('70px')};
  margin: 0 auto;
`;

const Footer = () => (
  <Container className="container">
    Powered by
    <StyledImage image="dak_logo" />
  </Container>
);

export default Footer