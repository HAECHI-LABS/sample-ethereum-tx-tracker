import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SpacerBlock = styled.div`
  height: ${props => props.height};
`;

Spacer.propTypes = {
  height: PropTypes.string.isRequired,
};

function Spacer({ height }) {
  return <SpacerBlock height={height} />;
}

export default Spacer;
