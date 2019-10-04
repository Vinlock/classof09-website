import React from 'react';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { rem } from 'polished';

const Rules = () => {
  const StyledPaper = styled(Paper)`
    padding: ${rem(20)};
    margin: ${rem(20)};
  `;

  const Img = styled.img`
    max-width: 200px;
  `;

  return (
    <>
      <StyledPaper className="text-center">
        <Typography variant="h5">
          Venue: <a href="https://www.malibuwines.com/malibu-wines-beer-garden/" rel="noopener noreferrer" target="_blank"><Img src="https://static1.squarespace.com/static/5adea8f331d4dfcf0915636a/t/5adea94103ce64714c8847dc/1569361675522/?format=1500w" /></a><br />
        </Typography>
        <Typography component="p">
          Malibu Wines & Beer Garden<br />
          23130 Sherman Way<br />
          West Hills, California 91307<br />
          818-578-4146<br />
          <a href="https://www.malibuwines.com/malibu-wines-beer-garden/" rel="noopener noreferrer" target="_blank">www.malibuwines.com/malibu-wines-beer-garden</a>
        </Typography>
      </StyledPaper>
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
