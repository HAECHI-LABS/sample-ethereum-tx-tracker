import React from 'react';
import ContainerMaterial from './Container.material';

Container.propTypes = {};

function Container({ children }) {
  return <ContainerMaterial children={children} />;
}

export default Container;
