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
      disabled: true,
    };
    this.trigger = React.createRef();
  }

  componentDidMount() {
    getAccessCode()
      .then((code) => {
        return this.runWidget(code);
      })
      .then(() => {
        this.setState({
          disabled: false,
        });
      });
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
      onOrderComplete: () => this.onOrderComplete(),
    });
    return new Promise(resolve =>
      setTimeout(() => resolve(true), 1000));
  };

  _setLoading = (state) => {
    this.setState({ loading: state });
  };

  purchase = () => {
    const { loading, disabled } = this.state;
    const { _setLoading } = this;

    return (
      <div>
        <Title variant="h4">
          Purchase Tickets
        </Title>
        <Title>
          Click below to purchase your 10 Year High School Reunion Tickets!
        </Title>
        <Title>
          Please be sure to put your first and last name as it appears in the yearbook!
        </Title>
        <LoadingButton
          loading={loading}
          variant="contained"
          disabled={loading || disabled}
          action={() => {
            this.trigger.current.click();
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
