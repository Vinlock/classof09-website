import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import styled from 'styled-components';
import { rem } from 'polished';
import { getAccessCodeUrl, getAccessCode } from '../../lib/api';
import LoadingButton from '../LoadingButton/LoadingButton';
import Grid from '@material-ui/core/Grid';

const StyledTypography = styled(Typography)`
  margin-bottom: ${rem('20px')} !important;
`;

const Step1 = (props) => {
  const style = {
    display: props.visible ? 'block' : 'none',
  };

  console.log('props.activeStep', props.activeStep);

  return (
    <div className="text-center" style={style}>
      <StyledTypography variant="h4">
        Purchase Tickets
      </StyledTypography>
      <StyledTypography>
        Click below to purchase your 10 Year High School Reunion Tickets!
      </StyledTypography>
      <Button
        style={{margin:'auto'}}
        variant="contained"
        disabled={props.activeStep !== 1 || props.currentStep !== 1}
        color="primary"
        onClick={() => props.setStep(2)}
      >
        <ConfirmationNumberIcon />&nbsp;&nbsp;Purchase Tickets
      </Button>
    </div>
  );
};

const Step2 = (props) => {
  const [coupleLoading, setCoupleLoading] = React.useState(false);
  const [singleLoading, setSingleLoading] = React.useState(false);

  const style = {
    display: props.visible ? 'block' : 'none',
  };

  const callback = () => {
    console.log('WORKED');
  };

  React.useEffect(() => {
    const eventId = process.env.GATSBY_EVENTBRITE_EVENT_ID;
    console.log('MOUNTING', eventId);
    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId: eventId,
      modal: true,
      promo_code:
      modalTriggerElementId: 'eventbrite-trigger',
      onOrderComplete: callback,
    });
  }, []);

  const { activeStep, currentStep, setCode, setStep } = props;

  return (
    <div className="text-center" style={style}>
      <StyledTypography variant="h4">
        Purchase Tickets
      </StyledTypography>
      <StyledTypography>
        Are you bringing a +1?
      </StyledTypography>
      <LoadingButton
        loading={coupleLoading}
        disabled={activeStep !== 1 || currentStep !== 2 || coupleLoading}
        action={() => {
          setCoupleLoading(true);
          getAccessCode('couple')
            .then((code) => {
              setCode(code);
              setStep(3);
              setCoupleLoading(false);
            });
        }}
        content={(
          <>
            <ConfirmationNumberIcon />&nbsp;&nbsp;Yes ($135.00)
          </>
        )}
      />
      <LoadingButton
        loading={singleLoading}
        disabled={activeStep !== 1 || currentStep !== 2 || singleLoading}
        action={() => {
          setSingleLoading(true);
          getAccessCode('couple')
            .then((code) => {
              setCode(code);
              setStep(3);
              setSingleLoading(false);
            });
        }}
        content={(
          <>
            <ConfirmationNumberIcon />&nbsp;&nbsp;No ($70.00)
          </>
        )}
      />
    </div>
  );
};

const Step3 = (props) => {
  const style = {
    display: props.visible ? 'block' : 'none',
  };

  return (
    <div className="text-center" style={style}>
      <Grid container>
        <Grid item xs={6} className="text-left">

        </Grid>
        <Grid item xs={6} className="text-right">

        </Grid>
      </Grid>
    </div>
  );
};

const TicketPurchaseFlow = (props) => {
  const [step, setStep] = React.useState(1);
  const [code, setCode] = React.useState(null);

  return (
    <div>
      <Step1 visible={step === 1} currentStep={step} setStep={setStep} {...props} />
      <Step2 visible={step === 2} currentStep={step} setStep={setStep} setCode={setCode} {...props} />
      <Step3 visible={step === 3} currentStep={step} setStep={setStep} setCode={setCode} {...props} />
    </div>
  )
};

export default TicketPurchaseFlow;
