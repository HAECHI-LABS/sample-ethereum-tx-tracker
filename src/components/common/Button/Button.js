import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ButtonMaterial from './Button.material';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string, // TODO: define custom propTypes
  color: PropTypes.string, // TODO: define custom propTypes
  onClick: PropTypes.func,
  href: PropTypes.string,
  fullWidth: PropTypes.bool,
  height: PropTypes.string,
};

function Button({ children, variant, color, onClick, href, fullWidth, height }) {
  return (
    <ButtonMaterial
      href={href}
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      onClick={onClick}
      height={height}
    >
      { children }
    </ButtonMaterial>
  );
}

export default withRouter(Button);
