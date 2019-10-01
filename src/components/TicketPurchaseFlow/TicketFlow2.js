import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import { getAccessCode } from '../../lib/api';
import LoadingButton from '../LoadingButton/LoadingButton';

class TicketFlow2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      purchaseStep: 1,
      singleLoading: false,
      coupleLoading: false,
      code: null,
      cart: {},
    };
    this.trigger = React.createRef();
  }

  runWidget = (code) => {
    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId: process.env.GATSBY_EVENTBRITE_EVENT_ID,
      modal: true,
      promoCode: code,
      modalTriggerElementId: 'eventbrite-trigger',
      onOrderComplete: () => console.log('testttt'),
    });
  };

  _nextStep = () => {
    this.setState((state) => {
      return {
        purchaseStep: state.purchaseStep + 1,
      };
    });
  };

  _setCoupleLoading = (state) => {
    this.setState({ coupleLoading: state });
  };

  _setSingleLoading = (state) => {
    this.setState({ singleLoading: state });
  };

  _setCode = (code) => {
    this.setState({ code });
  };

  _setCart = (product, price) => {
    this.setState({
      cart: {
        product, price,
      },
    });
  };

  step1 = () => {
    const { purchaseStep } = this.state;
    const buttonDisabled = purchaseStep !== 1;

    return (
      <VisibilityContainer visible={purchaseStep === 1}>
        <Title variant="h4">
          Purchase Tickets
        </Title>
        <Title>
          Click below to purchase your 10 Year High School Reunion Tickets!
        </Title>
        <PurchaseButton variant="contained" disabled={buttonDisabled} color="primary" onClick={this._nextStep}>
          <ConfirmationNumberIcon />&nbsp;&nbsp;Purchase Tickets
        </PurchaseButton>
      </VisibilityContainer>
    )
  };

  step2 = () => {
    const { purchaseStep, coupleLoading, singleLoading } = this.state;
    const { _setCoupleLoading, _setSingleLoading, _nextStep, _setCode, _setCart } = this;
    return (
      <VisibilityContainer visible={purchaseStep === 2}>
        <Title variant="h4">
          Purchase Tickets
        </Title>
        <Title>
          Are you bringing a +1?
        </Title>
        <LoadingButton
          loading={coupleLoading}
          disabled={purchaseStep !== 2 || coupleLoading}
          action={() => {
            _setCoupleLoading(true);
            getAccessCode('couple')
              .then((code) => {
                this.runWidget(code);
                this.trigger.current.click();
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
          disabled={purchaseStep !== 2 || singleLoading}
          action={() => {
            _setSingleLoading(true);
            getAccessCode('single')
              .then((code) => {
                _setCode(code);
                _setCart('Single Ticket', '$70.00');
                _setSingleLoading(false);
              });
          }}
          content={(
            <>
              <ConfirmationNumberIcon />&nbsp;&nbsp;No ($70.00)
            </>
          )}
        />
        <Typography>
          WARNING!! Once you choose the type of ticket, you will be locked into your choice.
        </Typography>
      </VisibilityContainer>
    );
  };

  step3 = () => {
    const { purchaseStep, cart } = this.state;
    return (
      <VisibilityContainer visible={purchaseStep === 3}>
        <div className="text-center">
          <Grid container>
            <Grid item xs={6} className="text-left">
              {cart.product}
            </Grid>
            <Grid item xs={6} className="text-right">
              {cart.price}
            </Grid>
          </Grid>
        </div>
      </VisibilityContainer>
    );
  };

  render() {
    const { purchaseStep } = this.state;
    return (
      <div className="text-center">
        {this[`step${purchaseStep}`]()}
        <InvisiButton id="eventbrite-trigger" ref={this.trigger} />
      </div>
    );
  }

}

const InvisiButton = styled.button`
  opacity: 0;
  width: 0;
  height: 0;
  visiblity: none;
`;

const VisibilityContainer = (props) => {
  return props.visible ? props.children : null;
};

const Title = styled(Typography)`
  margin-bottom: ${rem(20)} !important;
`;

const PurchaseButton = styled(Button)`
  margin: auto;
`;

export default TicketFlow2;
