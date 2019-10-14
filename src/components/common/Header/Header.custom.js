import React from 'react';
import { func } from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';
import Responsive from '../Responsive';
import Button from '../Button';
import { Link } from 'react-router-dom';
import palette from '../../../lib/styles/custom/theme/palette';
import { integrations } from '../../../types';

const HeaderBlock = styled.div`
  left: 0;
  top: 0;
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
    text-decoration: none;
    color: ${palette.gray[8]};
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const StyledSelect = styled(Select)`
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  width: 250px;

  // TODO: styling
`;

const Spacer = styled.div`
  height: 8rem;
`;

Header.propTypes = {
  integrations: integrations(),
  onChange: func,
};

// TODO: remove integrations, replace it with `options`
function Header({ user, onLogout, onChange, integrations, option }) {
  return (
    <>
      <HeaderBlock>
        <StyledSelect
          value={option}
          onChange={option => onChange(option.value)}
          options={
            integrations &&
            integrations.map(integration => ({
              value: integration.integrationId,
              label: integration.name,
            }))
          }
        />
        <Wrapper>
          <Link to="/" className="logo">
            HENESIS DASHBOARD
          </Link>
          <div className="right">
            <UserInfo>{user && user.email}</UserInfo>
            <Button onClick={onLogout}>Logout</Button>
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
}

export default Header;
