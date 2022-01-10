// @flow

import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import { connect } from 'react-redux';
import type { Map as MapType } from 'immutable';
import axios from 'axios';
import Loading from 'app/components/Loading';
import StyledHome from './style';
import { getPhoto } from './redux';
import { downloadWallpaper, setWallpaper } from '../../utils';

type Props = {
  photoData : MapType,
  setWallpaperLoading : boolean,
  activeTheme: any
};

const urlWallhaven = `https://wallhaven.cc/api/v1/search?apikey=${process.env.WALLHAVEN_ACCESS_KEY}&q=id:1&sorting=random&ref=fp`;

const Home = ({
  photoData,
  setWallpaperLoading,
  activeTheme,
} : Props) => {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [list, setList] = useState<any[]>([]);

  // fetch data
  const fetchData = useCallback(async () => {
    setFetchLoading(true);

    const result = await axios.get(urlWallhaven);
    // console.log('result', result);

    if (result.status === 200 && result.data.data) {
      setList(result.data.data);
    }

    setFetchLoading(false);
  }, []);

  useEffect(() => {
    console.log('photoData', photoData, photoData.get('color'));
    fetchData();
  }, []);

  const wrapperImageData = useMemo(() => (list[0] || ''), [list]);

  // handle download
  const handleDownload = async () => {
    setDownloadLoading(true);
    await downloadWallpaper({
      name: `wallhaven-${wrapperImageData.id}.${wrapperImageData.file_type.slice(6)}`,
      url: wrapperImageData.path,
    });
    setDownloadLoading(false);
  };

  return (
    <StyledHome>
      <div
        className={`photoWrapper${fetchLoading || setWallpaperLoading ? ' disabled' : ''}`}
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
        disabled={fetchLoading || setWallpaperLoading}
        onClick={setWallpaper}
      >
        <span>Set as Wallpaper</span>
        {setWallpaperLoading && <Loading color={activeTheme === 'Dark' ? '#ccc' : '#666'} size="14px" />}
      </button>
      <div className="bottomWrapper">
        <a className="author" href={wrapperImageData.path || ''}>
          Link
        </a>
        <button
          onClick={handleDownload}
          className={`download${fetchLoading || setWallpaperLoading || downloadLoading ? ' disabled' : ''}`}
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
    setWallpaperLoading: state.getIn(['Home', 'setWallpaperLoading']),
    getPhotoLoading: state.getIn(['Home', 'getPhotoLoading']),
    photoData: state.getIn(['Home', 'photoData']),
    activeCategory: state.getIn(['Categories', 'activeCategory']),
    activeTheme: state.getIn(['Settings', 'activeTheme']),
  }),
  {
    getPhotoAction: getPhoto,
    setWallpaperAction: setWallpaper,
  },
)(Home);
