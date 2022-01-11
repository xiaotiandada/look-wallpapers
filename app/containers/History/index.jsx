// @flow

import React, {
  memo, useCallback, useEffect, useState,
} from 'react';
import { connect } from 'react-redux';
import Loading from 'app/components/Loading';
// import PhotoItem from './components/PhotoItem';
import StyledHistory from './style';
import { downloadWallpaper, setWallpaper, storageGet } from '../../utils';
import Item from '../Custom/components/CategoryItem';
import { STORAGE_KEY } from '../../config';

type Props = {
};

const History = memo(({ } : Props) => {
  const [pictures, setPictures] = useState([]);
  const [getPicturesLoading, setGetPicturesLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const key = STORAGE_KEY;
    const picturesData = await storageGet(key);
    if (picturesData && picturesData.list) {
      setPictures(picturesData.list);
    }
  });

  useEffect(() => {
    fetchData();
    setGetPicturesLoading(false);
  }, []);

  return (
    <StyledHistory>
      {
        getPicturesLoading
        && (
        <div className="loading-wrapper">
          <Loading color="#bbb" size="22px" />
        </div>
        )
      }
      {
        (!getPicturesLoading && (pictures.length > 0))
          ? (
            <div className="wrapper">
              {
                pictures.map(picItem => (
                  <Item
                    key={picItem.id}
                    data={picItem}
                    setWallpaper={setWallpaper}
                    downloadWallpaper={downloadWallpaper}
                  />
                ))
              }
            </div>
          )
          : !getPicturesLoading && <p className="empty-history">You haven’t set any wallpaper yet</p>
      }
    </StyledHistory>
  );
});

export default connect()(History);
