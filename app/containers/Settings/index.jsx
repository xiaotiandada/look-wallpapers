// @flow

import React, {
  Fragment, memo, useState, useEffect,
} from 'react';
import type { SyntheticEvent } from 'react';
import { remote } from 'electron';
import { connect } from 'react-redux';
import storage from 'electron-json-storage';
import moment from 'moment';
import AutoLaunch from 'auto-launch';
import appPackage from '../../../package';
import StyledSettings from './style';
import { setActiveTheme, setAutomaticChangeActiveTheme } from './redux';

type Props = {
  setActiveThemeAction : (data : string) => void,
  setAutomaticChangeActiveThemeAction : (data : boolean) => void,
  activeTheme : string,
  isChangeAutomaticActiveTheme : boolean,
};

const updateMethods = ['Hourly', 'Daily', 'Weekly', 'Manually'];

const sourceList = [
  {
    name: 'Unsplash',
    mode: [{
      name: 'default',
      url: '',
      checked: true,
    }],
  },
  {
    name: 'Wallhaven',
    mode: [{
      name: '#anime',
      url: '',
      checked: true,
    },
    {
      name: '#anime girls',
      url: '',
      checked: false,
    }],
    checked: true,
  },
];

const Settings = memo(({
  activeTheme,
  isChangeAutomaticActiveTheme,
  setActiveThemeAction,
  setAutomaticChangeActiveThemeAction,
} : Props) => {
  const [autoUpdateWallpaperSchedule, setAutoUpdateWallpaperSchedule] = useState(null);
  const [isRunAtStartup, setIsRunAtStartup] = useState(false);

  useEffect(() => {
    storage.getMany(['isRunAtStartup', 'autoUpdateWallpaperSchedule'], (error, data) => {
      setIsRunAtStartup(data.isRunAtStartup);
      setAutoUpdateWallpaperSchedule(data.autoUpdateWallpaperSchedule || 'Manually');
    });
  }, []);

  const handleQuit = () => {
    remote.getCurrentWindow()
      .close();
  };

  const handleRunInStartup = ({ target: { checked } }) => {
    setIsRunAtStartup(checked);
    storage.set('isRunAtStartup', checked);
    const minecraftAutoLauncher = new AutoLaunch({
      name: 'Look Wallpapers',
      path: '/Applications/Look Wallpapers.app', // eslint-disable-line
    });
    if (checked) {
      minecraftAutoLauncher.enable();
    } else {
      minecraftAutoLauncher.disable();
    }
  };

  const handleChangeUpdateWallpaperScadule = (e : SyntheticEvent<HTMLButtonElement>) => {
    storage.set('autoUpdateWallpaperSchedule', e.target.value);
    storage.set('autoUpdateWallpaperLastUpdate', moment().format('MM/DD/YYYY HH:mm:ss'));
  };

  const handleChangeTheme = (e : SyntheticEvent<HTMLInputElement>) => {
    setActiveThemeAction(e.target.value);
  };

  const handleSetAutoChangeTheme = (e : SyntheticEvent<HTMLInputElement>) => {
    setAutomaticChangeActiveThemeAction(e.target.checked);
  };

  return (
    <StyledSettings>
      <label
        className="run-at-startup"
        htmlFor="run-at-startup"
      >
        Run at startup
        <input
          id="run-at-startup"
          type="checkbox"
          onChange={handleRunInStartup}
          checked={isRunAtStartup}
        />
      </label>
      {/* eslint-disable-next-line */}
      <label
        className="auto-update"
        htmlFor="update-method"
      >
        Update
        {
          !!autoUpdateWallpaperSchedule && (
            <select
              id="update-method"
              onChange={handleChangeUpdateWallpaperScadule}
              defaultValue={autoUpdateWallpaperSchedule}
            >
              {
                updateMethods.map((updateMethod : string) => (
                  <option key={updateMethod} value={updateMethod}>
                    {updateMethod}
                  </option>
                ))
              }
            </select>
          )
        }
      </label>
      <div className="choose-theme">
        <p>
          Theme:
          {
            (process.platform === 'darwin')
            && (
              <Fragment>
                <span>Change auto by OS</span>
                <input
                  className="changeAutoSetTheme"
                  type="checkbox"
                  onChange={handleSetAutoChangeTheme}
                  checked={isChangeAutomaticActiveTheme}
                />
              </Fragment>
            )
          }
        </p>
        {
          !isChangeAutomaticActiveTheme
          && (
            <Fragment>
              <label htmlFor="light">
                Light
                <input
                  id="light"
                  type="radio"
                  onChange={handleChangeTheme}
                  value="Light"
                  checked={activeTheme === 'Light'}
                />
              </label>
              <label htmlFor="dark">
                Dark
                <input
                  id="dark"
                  type="radio"
                  onChange={handleChangeTheme}
                  value="Dark"
                  checked={activeTheme === 'Dark'}
                />
              </label>
            </Fragment>
          )
        }
      </div>

      <div className="choose-theme">
        <p>Source:</p>
        {
          sourceList.map(i => (
            <div key={i.name}>
              <label htmlFor="light">
                {i.name}
                <input
                  className="changeAutoSetTheme"
                  type="radio"
                  checked={i.checked}
                />
              </label>
              {
                i.checked
                && (
                <div>
                  {
                      i.mode.map(j => (
                        <label htmlFor="light" key={`${i.name}-${j.name}`}>
                          {j.name}
                          <input
                            id="mode"
                            type="radio"
                            value={j.name}
                            checked={j.checked}
                          />
                        </label>
                      ))
                    }
                </div>
                )
              }
            </div>
          ))
        }
      </div>

      <button onClick={handleQuit} className="quit">
        Quit Look Wallpapers
      </button>
      <a className="author" href="https://github.com/xiaotiandada/look-wallpapers">
        Made with
        {' '}
        <i className="fa fa-heart" />
        {' '}
        on GitHub (v
        {appPackage.version}
        )
      </a>
    </StyledSettings>
  );
});

export default connect(
  state => ({
    activeTheme: state.getIn(['Settings', 'activeTheme']),
    isChangeAutomaticActiveTheme: state.getIn(['Settings', 'isChangeAutomaticActiveTheme']),
  }),
  {
    setActiveThemeAction: setActiveTheme,
    setAutomaticChangeActiveThemeAction: setAutomaticChangeActiveTheme,
  },
)(Settings);
