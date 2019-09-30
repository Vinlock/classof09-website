import { rem } from 'polished';
import styled from 'styled-components';

const Container = styled.div`
  width: ${ rem('500px') };
  margin: ${rem('10px')} auto;
  font-family: 'Roboto', sans-serif;
  @media (max-width: ${ props => props.theme.mdWidth }) {
    width: 100%;
  }
`;

export default Container;
