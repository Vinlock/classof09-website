import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import styled from 'styled-components';
import { rem } from 'polished';
import { getAccessCodeUrl, getAccessCode } from '../../lib/api';

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
  const style = {
    display: props.visible ? 'block' : 'none',
  };

  const callback = () => {
    console.log('WORKED');
  };

  React.useEffect(() => {
    console.log('MOUNTING');
    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId: `${process.env.GATSBY_EVENTBRITE_EVENT_ID}?discount=IBKUFCCMIEGLBLMKWKJW`,
      modal: true,
      modalTriggerElementId: 'eventbrite-trigger',
      onOrderComplete: callback,
    });
  }, []);

  return (
    <div className="text-center" style={style}>
      <StyledTypography variant="h4">
        Purchase Tickets
      </StyledTypography>
      <StyledTypography>
        Are you bringing a +1?
      </StyledTypography>
      <Button
        id="eventbrite-trigger"
        style={{marginBottom:rem(20), marginRight: rem(10), marginLeft: rem(10)}}
        variant="contained"
        disabled={props.activeStep !== 1 || props.currentStep !== 2}
        // onClick={() => {
        //   getAccessCode('couple')
        //     .then((url) => {
        //       // window.open(url, '_blank');
        //     });
        // }}
      >
        <ConfirmationNumberIcon />&nbsp;&nbsp;Yes ($135.00)
      </Button>
      <Button
        style={{marginBottom:rem(20), marginRight: rem(10), marginLeft: rem(10)}}
        variant="contained"
        disabled={props.activeStep > 1}
        onClick={() => {
          getAccessCodeUrl('single')
            .then((url) => {
              window.open(url, '_blank');
            });
        }}
      >
        <ConfirmationNumberIcon />&nbsp;&nbsp;No ($70.00)
      </Button>
      <StyledTypography>
        Return to this page after you purchase your tickets!
      </StyledTypography>
    </div>
  );
};

const TicketPurchaseFlow = (props) => {
  const [step, setStep] = React.useState(1);

  return (
    <div>
      <Step1 visible={step === 1} currentStep={step} setStep={setStep} {...props} />
      <Step2 visible={step === 2} currentStep={step} setStep={setStep} {...props} />
    </div>
  )
};

export default TicketPurchaseFlow;
