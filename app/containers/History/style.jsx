// @flow

import styled from 'styled-components';
import { boxsBackgroundColor } from 'app/styles/theme';

export default styled.div`
  background: ${boxsBackgroundColor};
  height: calc(100vh - 50px);
  width: 100%;
  overflow: auto;
  position: relative;
  > .loading-wrapper {
    height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
  > .empty-list {
    color: #999;
  }
  .empty-history {
    color: #999;
    text-align: center;
    width: 100%;
  }
`;
