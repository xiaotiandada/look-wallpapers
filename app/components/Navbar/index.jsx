// @flow

import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import os from 'os';
import history from 'app/utils/history';
import logo from './assets/logo.png';
import lightLogo from './assets/light-logo.png';
import Styles from './styles';

type Props = {
  location : Object,
  activeTheme : string,
};

const Navbar = memo(({ location, activeTheme } : Props) => {
  const [disableChangeRoute, setDisableChangeRoute] = useState();

  const handleChangePage = (path : string) => {
    if (!disableChangeRoute) {
      setDisableChangeRoute(true);
      history.push(location.pathname === path ? '/' : path);
      setTimeout(() => {
        setDisableChangeRoute(false);
      }, 100);
    }
  };

  return (
    <Styles>
      {os.type() === 'Darwin' && <div className="arrow" />}
      <div className="logoWrapper">
        <img src={activeTheme === 'Dark' ? lightLogo : logo} alt="logo" />
        <p>
          <span>Look</span>
          Wallpapers
        </p>
      </div>
      <div className="buttonsWrapper">
        <button
          type="button"
          onClick={() => handleChangePage('/')}
          className={location.pathname === '/' ? 'active' : ''}
        >
          <i className="fa fa-th-large" />
        </button>
        <button
          type="button"
          onClick={() => handleChangePage('/history')}
          className={location.pathname === '/history' ? 'active' : ''}
        >
          <i className="fa fa-history" />
        </button>
        <button
          type="button"
          onClick={() => handleChangePage('/settings')}
          className={location.pathname === '/settings' ? 'active' : ''}
        >
          <i className="fa fa-gear" />
        </button>
      </div>
    </Styles>
  );
});

export default connect(
  state => ({
    activeTheme: state.getIn(['Settings', 'activeTheme']),
  }),
  {},
)(Navbar);
