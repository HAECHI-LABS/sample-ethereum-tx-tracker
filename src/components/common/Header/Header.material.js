import React, { useState } from 'react';
import { styled } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { GoMarkGithub } from "react-icons/go";

const HeaderMaterialBlock = styled(AppBar)`
  width: 100%;
  justify-content: center;
`;

const StyledAccountButton = styled(IconButton)({
  color: 'inherit',
});

const StyledTypography = styled(Typography)({
  flexGrow: 1,
  color: 'white',
  textAlign: 'center'
});

HeaderMaterial.propTypes = {};

function HeaderMaterial() {

  return (
    <HeaderMaterialBlock elevation={0}>
      <Toolbar>
        <StyledTypography variant="h3">
          Henesis Transaction Tracker
        </StyledTypography>
      </Toolbar>
    </HeaderMaterialBlock>
  );
}

export default HeaderMaterial;
