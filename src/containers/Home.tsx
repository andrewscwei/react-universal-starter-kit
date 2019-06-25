import React, { ComponentType, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
import ReactLogo from '../components/ReactLogo';
import withPageTitle from '../decorators/withPageTitle';
import { AppState } from '../store';
import { I18nState } from '../store/i18n';

interface StateProps {
  i18n: I18nState;
}

interface DispatchProps {}

interface OwnProps {}

export interface Props extends StateProps, DispatchProps, OwnProps {}

export interface State {}

class Home extends PureComponent<Props, State> {
  render() {
    const { i18n } = this.props;

    return (
      <StyledRoot>
        <StyledReactLogo/>
        <h1>{i18n.ltxt('hello')}</h1>
        <p>v{__BUILD_CONFIG__.version} ({__BUILD_CONFIG__.buildNumber})</p>
        <p>{i18n.ltxt('description')}</p>
      </StyledRoot>
    );
  }
}

export default connect(
  (state: AppState): StateProps => ({
    i18n: state.i18n,
  }),
  (dispatch: Dispatch<Action>): DispatchProps => bindActionCreators({

  }, dispatch),
)(withPageTitle('home')(Home));

const StyledRoot = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  font-family: ${props => props.theme.font};
  height: 100%;
  justify-content: center;
  padding: 10% 5%;
  position: absolute;
  width: 100%;

  h1 {
    color: ${props => props.theme.titleColor};
    font-size: 5em;
    font-weight: 700;
    letter-spacing: 3px;
    margin: 0;
    max-width: 550px;
    text-align: center;
    text-transform: uppercase;
  }

  p {
    color: ${props => props.theme.textColor};
    font-weight: 400;
    letter-spacing: .6px;
    line-height: 1.6em;
    max-width: 400px;
    margin: 0;
    text-align: center;
  }
`;

const StyledReactLogo = styled(ReactLogo as ComponentType)`
  height: 200px;
  margin-bottom: 30px;
`;
