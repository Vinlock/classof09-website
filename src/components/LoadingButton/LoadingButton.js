import React from 'react';
import { rem } from 'polished';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const Container = styled.div`
  position: relative;
  margin-bottom: ${rem(20)};
  margin-right: ${rem(10)};
  margin-left: ${rem(10)};
`;

const StyledCircularProgress = styled(CircularProgress)`
  color: blue;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -12px;
`;

const LoadingButton = ({ loading, action, disabled, children }) => {
  return (
    <Container>
      <Button variant="contained" color="primary" disabled={disabled} onClick={action}>
        {children}
      </Button>
      {loading && <StyledCircularProgress size={24} />}
    </Container>
  )
};

export default LoadingButton;
