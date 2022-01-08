// @flow
import React, {
  memo, useCallback, useEffect, useState,
} from 'react';
import { connect } from 'react-redux';
import Loading from 'app/components/Loading';
import wallpaper from 'wallpaper';
import os from 'os';
import axios from 'axios';
import util from 'util';
import path from 'path';
import fs from 'fs';
import StyledCustom from './style';
import Item from './components/CategoryItem';

type Props = {};
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

const urlWallhaven = `https://wallhaven.cc/api/v1/search?apikey=${process.env.WALLHAVEN_ACCESS_KEY}&q=id:1&sorting=random&ref=fp`;

const Custom = memo(({} : Props) => {
  const [list, setList] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    const result = await axios.get(urlWallhaven);
    // console.log('result', result);

    if (result.status === 200 && result.data.data) {
      setList(result.data.data);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  // anime q=id:1&sorting=random&ref=fp
  // anime girls q=id%3A5&sorting=random&ref=fp

  /**
   * download image
   */
  const downloadImage = useCallback(
    async ({
      name,
      url,
    }) => {
      // path
      const outputLocationPath = path.join(
        os.homedir(),
        '/Pictures',
        name,
      );

      // download
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
      });

      const base64Image = new Buffer.from(
        response.data,
        'binary',
      ).toString('base64');
      await util.promisify(fs.writeFile)(outputLocationPath, base64Image, 'base64');

      return outputLocationPath;
    },
    [],
  );
  /**
   * download wallpaper
   */
  const downloadWallpaper = useCallback(
    async ({
      name,
      url,
    }) => {
      await downloadImage({ name, url });
      console.log('download wallpaper success');
    },
    [],
  );

  /**
   * set wallpaper
   */
  const setWallpaper = useCallback(
    async ({
      name,
      url,
    }) => {
      const imagePath = await downloadImage({ name, url });
      await wallpaper.set(imagePath, { scale: 'auto' });
      console.log('set wallpaper success');
    },
    [],
  );

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
                <button onClick={fetchData} className="button">随机</button>
              </div>
            </>
          )
      }
    </StyledCustom>
  );
});

export default connect()(Custom);
