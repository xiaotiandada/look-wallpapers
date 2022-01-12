// @flow
import React, {
  memo, useCallback, useEffect, useState,
} from 'react';
import { connect } from 'react-redux';
import Loading from 'app/components/Loading';
import axios from 'axios';
import StyledCustom from './style';
import Item from './components/CategoryItem';
import { downloadWallpaper, setWallpaper, wallhavenUrl } from '../../utils';
import { API_LIST } from '../../config';

type Props = {
  activeTheme: any
};
// type WallhavenData = {
//   id: string
//   url: string
//   short_url: string
//   views: number
//   favorites: number
//   source: string
//   purity: string
//   category: string
//   dimension_x: number
//   dimension_y: number
//   resolution: string
//   ratio: string
//   file_size: number
//   file_type: string
//   created_at: string
//   colors: string[]
//   path: string
//   thumbs: {
//     large: string
//     original: string
//     small: string
//   }
// }

const Custom = memo(({
  activeTheme,
} : Props) => {
  const [list, setList] = useState<any[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  /**
   * fetch Data
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

  return (
    <StyledCustom>
      {
        !list.length
          ? (
            <div className="loading-wrapper">
              <Loading size="20px" color="#bbb" />
            </div>
          )
          : (
            <>
              <div className="wrapper">
                {
                  list.map(i => (
                    <Item
                      key={i.id}
                      data={i}
                      setWallpaper={setWallpaper}
                      downloadWallpaper={downloadWallpaper}
                    />
                  ))
                }
              </div>
              <div className="action">
                <button onClick={fetchData} className="button">
                  <span style={{ marginRight: 4 }}>随机</span>
                  {
                    fetchLoading && <Loading color={activeTheme === 'Dark' ? '#ccc' : '#666'} size="10px" />
                  }
                </button>
              </div>
            </>
          )
      }
    </StyledCustom>
  );
});

export default connect(
  state => ({
    activeTheme: state.getIn(['Settings', 'activeTheme']),
  }),
)(Custom);
