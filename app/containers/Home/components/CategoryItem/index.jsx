// @flow

import React, { memo } from 'react';
import StyledCategoryItem from './style';

type Props = {
  data: any,
  setWallpaper: ({ name: string, url: string }) => void,
  downloadWallpaper: ({ name: string, url: string }) => void,
};

export default memo(({
  data, setWallpaper, downloadWallpaper,
} : Props) => (
  <StyledCategoryItem
    background={data.thumbs.small}
  >
    <a className="item" href={data.path}>
      <i className="fa fa-eye" aria-hidden="true" />
    </a>
    <div
      className="item"
      onClick={() => setWallpaper({
        name: `wallhaven-${data.id}.${data.file_type.slice(6)}`,
        url: data.path,
      })}
    >
      <i className="fa fa-cog" aria-hidden="true" />
    </div>
    <div
      className="item"
      onClick={() => downloadWallpaper({
        name: `wallhaven-${data.id}.${data.file_type.slice(6)}`,
        url: data.path,
      })}
    >
      <i className="fa fa-download" aria-hidden="true" />
    </div>
  </StyledCategoryItem>
));
