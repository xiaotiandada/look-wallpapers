// @flow
import useSWR from 'swr';
import React, {
  memo, useState, useEffect, useCallback,
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

const Custom = memo(({} : Props) => {
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  // anime q=id:1&sorting=random&ref=fp
  // anime girls q=id%3A5&sorting=random&ref=fp
  const { data, error } = useSWR(`https://wallhaven.cc/api/v1/search?apikey=${process.env.WALLHAVEN_ACCESS_KEY}&q=id:1&sorting=random&ref=fp`, fetcher);
  if (error) return <div>failed to load</div>;


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
        !data
        && (
        <div className="loading-wrapper">
          <Loading size="20px" color="#bbb" />
        </div>
        )
      }
      <div className="categories-wrapper">
        {
          data
          && data.data.map(i => (
            <Item
              key={i.id}
              data={i}
              setWallpaper={setWallpaper}
              downloadWallpaper={downloadWallpaper}
            />
          ))
        }
      </div>
    </StyledCustom>
  );
});

export default connect()(Custom);
