import React from 'react';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { rem } from 'polished';

const Rules = () => {
  const [openRules, rulesState] = React.useState(true);

  const StyledPaper = styled(Paper)`
    padding: ${rem(20)};
    margin: ${rem(20)};
  `;

  return (
    <>
      <StyledPaper>
        <Typography variant="h5">
          Event Information
        </Typography>
        <Typography component="p">
          <ul>
            <li><b>NO EARLY ARRIVALS</b></li>
            <li><b>Dress Code:</b> Business Casual / Cocktail Attire</li>
            <li>Outdoor Venue. Plan for low 70s mid 60s weather.</li>
            <li><b>Ladies:</b> Pebbles/Sand, plan ahead on shoes.</li>
            <li><b>Serving:</b> Plenty of Food and Hors d'oeuvres.</li>
          </ul>
        </Typography>
      </StyledPaper>
      <StyledPaper>
        <Typography variant="h5">
          Parking
        </Typography>
        <Typography component="p">
          <ul>
            <li>No parking validation. Valet is required and <b>$6 CASH ONLY</b>.</li>
            <li><b>Recommended:</b> Use Uber or Lyft. The police will be contacted for anyone attempting to drink and drive, no exceptions. The safety of everyone is taken very seriously.</li>
            <li>No street parking, tow away. Park at your own risk!</li>
          </ul>
        </Typography>
      </StyledPaper>
      <StyledPaper>
        <Typography variant="h5">
          Security
        </Typography>
        <Typography component="p">
          <ul>
            <li>All parties must be accompanied with a Class of 2009 graduate.</li>
            <li>Bag Check</li>
            <li>ID is required</li>
          </ul>
        </Typography>
      </StyledPaper>
    </>
  );
};

export default Rules;
