import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import palette from '../../../lib/styles/custom/theme/palette';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${props =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${props =>
    props.indigo &&
    css`
      background: ${palette.indigo[7]};
      &:hover {
        background: ${palette.indigo[5]};
      }
    `}
  
  &:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  ${buttonStyle}
`;

Button.propTypes = {
  to: PropTypes.string,
};

function Button(props) {
  return props.to ? (
    <StyledLink {...props} indigo={props.indigo ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
}

export default withRouter(Button);
