import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  height: ${props => props.height ? props.height : '3rem'};
`;

ButtonMaterial.propTypes = {};

function ButtonMaterial({ children, variant, color, onClick, href, fullWidth, height }) {
  return (
    <StyledButton
      variant={variant}
      color={color}
      onClick={onClick}
      fullWidth={fullWidth}
      href={href}
      height={height}
    >
      { children }
    </StyledButton>
  );
}

export default ButtonMaterial;
