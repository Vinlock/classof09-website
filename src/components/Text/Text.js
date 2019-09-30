import { rem } from 'polished';
import styled from 'styled-components';

const Text = styled.div`
  text-align: left;
  max-width: ${rem('500px')};
  margin: ${rem('20px')} auto;
  padding: ${rem('15px')};
  p {
    margin: ${rem('10px')} auto;
  }
`;

export default Text;
