import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Paper from '@material-ui/core/Paper';
import StepConnector from '@material-ui/core/StepConnector';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';
import CommentIcon from '@material-ui/icons/Comment';
import clsx from 'clsx';
import styled from 'styled-components';
import { rem } from 'polished';
import TicketFlow2 from '../TicketPurchaseFlow/TicketFlow2';
import Rules from '../Rules';

const StyledTypography = styled(Typography)`
  margin-left: ${rem('20px')} !important;
  margin-bottom: ${rem('20px')} !important;
`;

const StyledPaper = styled(Paper)`
  padding: ${rem('20px')};
`;

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

export default function ReunionStepper(props) {
  const [activeStep] = React.useState(props.activeStep);

  const steps = [
    {
      title: 'Complete Survey',
      content: (
        <div className="text-center">
          <StyledTypography variant="h4">
            Complete Survey
          </StyledTypography>
          <StyledTypography>
            Take the survey so we can collect data to make the best reunion possible!
          </StyledTypography>
          <Button
            style={{margin:'auto'}}
            variant="contained"
            disabled={activeStep > 0}
            color="primary"
            onClick={props.openTypeForm}
          >
            <CommentIcon />&nbsp;&nbsp;Take Survey
          </Button>
        </div>
      ),
    },
    {
      title: 'Purchase Tickets',
      content: (
        <>
          <TicketFlow2 flowStep={activeStep} />
          <Rules />
        </>
      ),
    },
    {
      title: 'Done!',
      content: (
        <>
          <div className="text-center">
            <StyledTypography variant="h4">
              You have already purchased your ticket!<br />See you there!
            </StyledTypography>
            <StyledTypography>
              Read below for important event information. Feel free to check back to this page anytime.
            </StyledTypography>
          </div>
          <Rules />
        </>
      ),
    },
  ];

  return (
    <div>
      <Stepper activeStep={activeStep} connector={<QontoConnector />} alternativeLabel>
        {steps.map(step => (
          <Step key={step.title}>
            <StepLabel StepIconComponent={QontoStepIcon}>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <StyledPaper>
        {steps[activeStep].content}
      </StyledPaper>
    </div>
  );
};