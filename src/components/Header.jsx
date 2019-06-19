import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { getLocalizedPath } from '../routes/client';

const Header = ({ locale, ltxt }) => (
  <StyledRoot>
    <Link to={getLocalizedPath('/', locale)}>{ltxt('home')}</Link>
    <Link to={getLocalizedPath('/about', locale)}>{ltxt('about')}</Link>
  </StyledRoot>
);

Header.propTypes = {
  ltxt: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default connect(
  (state) => ({
    ltxt: state.i18n.ltxt,
    locale: state.i18n.locale,
  }),
  (dispatch) => bindActionCreators({

  }, dispatch),
)(Header);

const StyledRoot = styled.header`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 70px;
  justify-content: flex-end;
  padding: 0 5%;
  position: fixed;
  width: 100%;
  z-index: 10;

  > a {
    color: ${props => props.theme.linkColor};
    cursor: pointer;
    font-family: ${props => props.theme.font};
    font-size: .8em;
    font-weight: 400;
    letter-spacing: 1px;
    text-decoration: none;
    text-transform: uppercase;
    transition: all .2s ease-out;

    :hover {
      opacity: .6;
    }

    :not(:last-child) {
      margin-right: 20px;
    }
  }
`;
