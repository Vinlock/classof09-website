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
      loading: false,
      code: null,
      cart: {},
    };
    this.trigger = React.createRef();
  }

  onOrderComplete = () => {
    window.reload();
  };

  runWidget = (code) => {
    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId: process.env.GATSBY_EVENTBRITE_EVENT_ID,
      modal: true,
      promoCode: code,
      modalTriggerElementId: 'eventbrite-trigger',
      onOrderComplete: () => this.onOrderComplete,
    });
    return new Promise(resolve =>
      setTimeout(() => resolve(true), 300));
  };

  _setLoading = (state) => {
    this.setState({ loading: state });
  };

  purchase = () => {
    const { loading } = this.state;
    const { _setLoading } = this;

    return (
      <div>
        <Title variant="h4">
          Purchase Tickets
        </Title>
        <Title>
          Click below to purchase your 10 Year High School Reunion Tickets!
        </Title>
        <LoadingButton
          loading={loading}
          variant="contained"
          disabled={loading}
          action={() => {
            _setLoading(true);
            getAccessCode()
              .then((code) => {
                return this.runWidget(code);
              })
              .then(() => {
                this.trigger.current.click();
                _setLoading(false);
              });
          }}
        >
          <ConfirmationNumberIcon />&nbsp;&nbsp;Purchase Tickets
        </LoadingButton>
      </div>
    )
  };

  render() {
    const buttonId = 'eventbrite-trigger';
    return (
      <div className="text-center">
        {this.purchase()}
        <InvisiButton id={buttonId} ref={this.trigger} />
      </div>
    );
  }

}

const InvisiButton = styled.button`
  opacity: 0;
  width: 0;
  height: 0;
  visibility: hidden;
`;

const Title = styled(Typography)`
  margin-bottom: ${rem(20)} !important;
`;

export default TicketFlow2;
