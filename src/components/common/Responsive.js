import React from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  margin: 0 auto;
  padding: 2rem 2rem;
  width: calc(100vw - 240px);
  overflow-x: hidden;

  @media (max-width: 1024px) {
    width: 768px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// TODO: define children types
Responsive.propTypes = {};

function Responsive({ children, ...rest }) {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
}

export default Responsive;
