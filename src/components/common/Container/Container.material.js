import React from 'react';
import styled from 'styled-components';

const ContainerMaterialBlock = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 64px;
`;

ContainerMaterial.propTypes = {};

function ContainerMaterial({ children }) {
  return (
    <ContainerMaterialBlock>
      { children }
    </ContainerMaterialBlock>
  );
}

export default ContainerMaterial;
