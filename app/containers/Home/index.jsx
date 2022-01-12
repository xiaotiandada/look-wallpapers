// @flow

import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Loading from 'app/components/Loading';
import { uniqBy } from 'lodash';
import StyledHome from './style';
import {
  downloadWallpaper, setWallpaper, storageGet, storageSet, wallhavenUrl,
} from '../../utils';
import { KEY_STORAGE_PICTURES } from '../../config';

type Props = {
  activeTheme: string
};

const Home = ({
  activeTheme,
} : Props) => {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [wallpaperLoading, setWallpaperLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [list, setList] = useState<any[]>([]);

  /**
   * fetch data
   * @type {(function(): Promise<void>)|*}
   */
  const fetchData = useCallback(async () => {
    setFetchLoading(true);

    const url = await wallhavenUrl();
    const result = await axios.get(url);
    // console.log('result', result);

    if (result.status === 200 && result.data.data) {
      setList(result.data.data);
    }

    setFetchLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * wrapper Image Data
   * @type {unknown}
   */
  const wrapperImageData = useMemo(() => (list[0] || ''), [list]);

  /**
   * save Storage
   * @type {(function(*): Promise<void>)|*}
   */
  const saveStorage = useCallback(async (data) => {
    const key = KEY_STORAGE_PICTURES;
    const pictures = await storageGet(key);

    if (pictures.list) {
      const picturesList = [
        ...pictures.list,
        data,
      ];
      await storageSet(key, {
        list: uniqBy(picturesList, 'id'),
      });
    } else {
      await storageSet(key, {
        list: [
          data,
        ],
      });
    }
  }, []);

  /**
   * handle download
   * @returns {Promise<void>}
   */
  const handleDownload = async () => {
    setDownloadLoading(true);

    await downloadWallpaper({
      name: `wallhaven-${wrapperImageData.id}.${wrapperImageData.file_type.slice(6)}`,
      url: wrapperImageData.path,
    });

    await saveStorage(wrapperImageData);

    setDownloadLoading(false);
  };

  /**
   * handle Set Wallpaper
   * @returns {Promise<void>}
   */
  const handleSetWallpaper = async () => {
    setWallpaperLoading(true);
    await setWallpaper({
      name: `wallhaven-${wrapperImageData.id}.${wrapperImageData.file_type.slice(6)}`,
      url: wrapperImageData.path,
    });
    setWallpaperLoading(false);
  };

  return (
    <StyledHome>
      <div
        className={`photoWrapper${fetchLoading || wallpaperLoading ? ' disabled' : ''}`}
        style={{
          backgroundImage: `url(${wrapperImageData.path || ''})`,
          backgroundColor: wrapperImageData.colors ? (wrapperImageData.colors[0] || '#ffffff') : '#ffffff',
        }}
        onClick={() => fetchData()}
      >
        <div className="buttonWrapper">
          {fetchLoading ? (
            <Loading color="#fff" size="16px" />
          ) : (
            <i className="fa fa-refresh" />
          )}
        </div>
        <span
          className="badge location"
        >
          <i className="fa fa-tag" aria-hidden="true" />
          {
            wrapperImageData.category || 'Unknown'
          }
        </span>
        <span className="badge likes">
          <i className="fa fa-heart" />
          {wrapperImageData.favorites || 0}
        </span>
      </div>
      <button
        className="setWallpaperButton"
        disabled={fetchLoading || wallpaperLoading}
        onClick={handleSetWallpaper}
      >
        <span>Set as Wallpaper</span>
        {wallpaperLoading && <Loading color={activeTheme === 'Dark' ? '#ccc' : '#666'} size="14px" />}
      </button>
      <div className="bottomWrapper">
        <a className="author" href={wrapperImageData.path || ''}>
          Link
        </a>
        <button
          onClick={handleDownload}
          className={`download${fetchLoading || wallpaperLoading || downloadLoading ? ' disabled' : ''}`}
        >
          Download
          {downloadLoading && <Loading color={activeTheme === 'Dark' ? '#ccc' : '#666'} size="10px" />}
        </button>
      </div>
    </StyledHome>
  );
};

export default connect(
  state => ({
    activeTheme: state.getIn(['Settings', 'activeTheme']),
  }),
)(Home);
