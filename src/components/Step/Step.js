import React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'
import { rem } from 'polished'
import { clearFix, noSelect } from '../../styles/mixins'

const Container = styled.div`
  width: ${ rem('500px') };
  margin: ${rem('10px')} auto;
  font-family: 'Roboto', sans-serif;
  @media (max-width: ${ props => props.theme.mdWidth }) {
    width: 100%;
  }
`;

const StepContainer = styled.div`
  position: relative;
  margin: 0 !important;
  padding: ${ rem('20px') };
  filter: blur(0px);
  transition: filter 300ms;
  backface-visibility: hidden;
  transform: translateZ(0) scale(1.0, 1.0);
  ${ clearFix() };
  ${props => {
    if (props.disabled) {
      return `
        border-top: 1px solid rgba(204, 61, 75, 1);
        border-bottom: 1px solid rgba(204, 61, 75, 1);
        background-color: rgba(204, 61, 75, 0.2);
      `;
    }
    return `
      border-top: 1px solid rgba(37, 176, 204, 1);
      border-bottom: 1px solid rgba(37, 176, 204, 1);
      background-color: rgba(37, 176, 204, 0.2);
    `;
  }};
  ${props => props.disabled && `
    filter: blur(4px);
  `};
`;

const Description = styled.div`
  margin-top: ${rem('10px')};
`;

const ColumnContainer = styled.div`
  padding: 0;
  margin: 0;
`;

const DisabledOverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  transition: opacity 300ms;
  font-size: ${rem('30px')};
  font-family: 'Roboto', sans-serif;
  ${props => !props.disabled && `
    opacity: 1;
  `};
`;

const DisabledOverlay = ({ override = null}) => {
  return (
    <DisabledOverlayContainer>
      {override || "Coming Soon!"}
    </DisabledOverlayContainer>
  );
};

const Button = styled.button`
  ${noSelect()};
  &:hover, &:focus, &:active {
    background-color: rgba(37, 176, 204, 1);
  }
`;

const Step = ({ stepNumber, title, disabled, description, actionText, disabledOverlay }) => {
  return(
    <Container className="row">
      <ColumnContainer className="col-12 position-relative">
        {disabled ? <DisabledOverlay override={disabledOverlay} /> : null}
        <StepContainer disabled={disabled}>
          <div className="row">
            <div className="col-6">
              <h3 className="text-left">{title}</h3>
              <br />
              {typeof actionText === 'function' ? actionText() : <Button disabled={disabled} className="btn btn-dark">
                {actionText}
              </Button>}
            </div>
            <Description className="col-6">
              <p className="text-right">
                {description}
              </p>
            </Description>
          </div>
        </StepContainer>
      </ColumnContainer>
    </Container>
    );
};

Step.defaultProps = {
  disabled: false,
};

Step.propTypes = {
  stepNumber: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  actionText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  description: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Step
