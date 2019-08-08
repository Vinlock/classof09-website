export const noSelect = () => `
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  &:focus {
    outline: 0 !important;
  }
`;

export const verticalAlign = () => `
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-40%);
    -moz-transform: translateY(-40%);
    -ms-transform: translateY(-40%);
    transform: translateY(-40%);
    @media (max-width: ${props => props.theme.smWidth}) {
      margin-bottom: 55%;
    }
  `;

export const container = (props) => `
  padding: 2rem 5rem;
  margin: 0 auto;
  @media (max-width: ${props.theme.mdWidth}) {
    padding: 0 2rem;
  }
  @media (min-width: ${props.theme.smWidth}) {
    max-width: 540px;
  }
  @media (min-width: ${props.theme.mdWidth}) {
    max-width: 720px;
  }
  @media (min-width: ${props.theme.lgWidth}) {
    max-width: 960px;
  }
  @media (min-width: ${props.theme.xlWidth}) {
    max-width: 1140px;
  }
`;

export const clearFix = () => `
  &::after {
    display: block;
    content: "";
    clear: both;
  }
`;
