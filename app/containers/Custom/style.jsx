// @flow

import styled from 'styled-components';
import { boxsBackgroundColor } from 'app/styles/theme';

export default styled.div`
  background: ${boxsBackgroundColor};
  height: calc(100vh - 50px);
  width: 100%;
  overflow: hidden;
  position: relative;
  > .loading-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 50px);
  }
  > .categories-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 0 8px;
  }
`;
