import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import CoreLayout from '../layouts/CoreLayout';
import SEO from '../components/SEO';

const TicketsPage = () => {
  return (
    <CoreLayout>
      <SEO title="Tickets" />
      <button id="example-widget-trigger" type="button" className="btn btn-primary">Buy Tickets</button>
    </CoreLayout>
  );
};

export default TicketsPage;
