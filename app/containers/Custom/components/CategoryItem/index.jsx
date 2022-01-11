// @flow

import React, { memo, useCallback } from 'react';
import { uniqBy } from 'lodash';
import StyledCategoryItem from './style';
import { STORAGE_KEY } from '../../../../config';
import { storageGet, storageSet } from '../../../../utils';

type Props = {
  data: any,
  setWallpaper: ({ name: string, url: string }) => void,
  downloadWallpaper: ({ name: string, url: string }) => void,
};

export default memo(({
  data, setWallpaper, downloadWallpaper,
} : Props) => {
  /**
   * save Storage
   * @type {(function(): Promise<void>)|*}
   */
  const saveStorage = useCallback(async () => {
    const key = STORAGE_KEY;
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
  }, [data]);

  /**
   * handle Download Wallpaper
   * @type {(function(): Promise<void>)|*}
   */
  const handleDownloadWallpaper = useCallback(async () => {
    await downloadWallpaper({
      name: `wallhaven-${data.id}.${data.file_type.slice(6)}`,
      url: data.path,
    });

    await saveStorage(data);
  }, [data]);

  /**
   * handle Set Wallpaper
   * @type {(function(): Promise<void>)|*}
   */
  const handleSetWallpaper = useCallback(async () => {
    await setWallpaper({
      name: `wallhaven-${data.id}.${data.file_type.slice(6)}`,
      url: data.path,
    });

    await saveStorage(data);
  }, [data]);

  return (
    <StyledCategoryItem
      background={data.thumbs.small}
    >
      <a className="item" href={data.path}>
        <i className="fa fa-eye" aria-hidden="true" />
      </a>
      <div
        className="item"
        onClick={handleSetWallpaper}
      >
        <i className="fa fa-cog" aria-hidden="true" />
      </div>
      <div
        className="item"
        onClick={handleDownloadWallpaper}
      >
        <i className="fa fa-download" aria-hidden="true" />
      </div>
    </StyledCategoryItem>
  );
});
