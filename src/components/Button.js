// @flow

import styled from 'styled-components'

const colors = {
    dark_blue: '#003865',
    blue: '#9BCBEB',
    white: '#ffffff'
}

const Button = styled.button`
  background: ${props => props.primary ? colors.blue : colors.white};
  color: ${props => props.primary ? colors.white : colors.blue};
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  text-transform: uppercase;
  text-align: center;
  border: 2px solid ${colors.dark_blue};
  border-radius: 20px;
  padding: 0.5em 1.5em;
  margin: 0em 0.5em;
  cursor: pointer;
`;

export default Button