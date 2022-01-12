// @flow

import React, {
  Fragment, memo, useState, useEffect, useCallback,
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
import { API_LIST, KEY_STORAGE_SOURCE } from '../../config';
import {
  imagesSavePath, modifySavePath, storageGet, storageSet,
} from '../../utils';

type Props = {
  setActiveThemeAction : (data : string) => void,
  setAutomaticChangeActiveThemeAction : (data : boolean) => void,
  activeTheme : string,
  isChangeAutomaticActiveTheme : boolean,
};

const updateMethods = ['Hourly', 'Daily', 'Weekly', 'Manually'];


const Settings = memo(({
  activeTheme,
  isChangeAutomaticActiveTheme,
  setActiveThemeAction,
  setAutomaticChangeActiveThemeAction,
} : Props) => {
  const [autoUpdateWallpaperSchedule, setAutoUpdateWallpaperSchedule] = useState(null);
  const [isRunAtStartup, setIsRunAtStartup] = useState(false);
  const [sourceKey, setSourceKey] = useState('anime');
  const [savePath, setSavePath] = useState('');

  /**
   * fetch Source Key
   * @type {(function(): void)|*}
   */
  const fetchSourceKey = useCallback(async () => {
    const sourceData = await storageGet(KEY_STORAGE_SOURCE);
    if (sourceData && sourceData.tag) {
      const list = Object.keys(API_LIST);
      if (list.includes(sourceData.tag)) {
        setSourceKey(sourceData.tag);
      } else {
        setSourceKey('anime');
      }
    } else {
      setSourceKey('anime');
    }
  }, []);

  const fetchSavePath = useCallback(async () => {
    setSavePath(await imagesSavePath());
  }, []);

  useEffect(() => {
    storage.getMany(['isRunAtStartup', 'autoUpdateWallpaperSchedule'], (error, data) => {
      setIsRunAtStartup(data.isRunAtStartup);
      setAutoUpdateWallpaperSchedule(data.autoUpdateWallpaperSchedule || 'Manually');
    });

    fetchSourceKey();
    fetchSavePath();
  }, [fetchSavePath]);

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

  /**
   * handle Save Path
   * @type {(function(): void)|*}
   */
  const handleSavePath = useCallback(() => {
    remote.dialog.showOpenDialog({ properties: ['openDirectory'] })
      .then((result) => {
        console.log(result.canceled);
        console.log(result.filePaths);

        if (!result.canceled && result.filePaths.length) {
          modifySavePath(result.filePaths[0])
            .then(() => fetchSavePath());
        }
      }).catch((err) => {
        console.log(err);
      });
  }, [fetchSavePath]);

  /**
   * handle Source Change
   * @type {(function(*): Promise<void>)|*}
   */
  const handleSourceChange = useCallback(async (tag) => {
    await storageSet(KEY_STORAGE_SOURCE, { tag });
    setSourceKey(tag);
  }, []);

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
        <p>
          Source Wallhaven:
          {
            Object.keys(API_LIST).map(i => (
              <label htmlFor="source" key={i} className="source-label">
                <input
                  id="mode"
                  type="radio"
                  value={i}
                  checked={i === sourceKey}
                  onChange={() => handleSourceChange(i)}
                />
                {i}
              </label>
            ))
        }
        </p>
      </div>

      <div className="choose-theme">
        <p>
          Save Path:
          <span className="path">{ savePath }</span>
          <span className="path-btn" onClick={handleSavePath}>修改</span>
        </p>
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
