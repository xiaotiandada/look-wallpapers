// @flow

import styled from 'styled-components';
import { boxsBackgroundColor } from 'app/styles/theme';
import theme from 'styled-theming';

const quitButtonColor = theme('mode', {
  Light: '#fff',
  Dark: '#4e5252',
});

const quitButtonTextColor = theme('mode', {
  Light: '#222',
  Dark: '#b4b3b7',
});

export default styled.div`
  background: ${boxsBackgroundColor};
  height: calc(100vh - 50px);
  width: 100%;
  overflow: auto;
  position: relative;
  .wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
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
  .action {
    text-align: center;
  }
  .button {
    background: ${quitButtonColor};
    color: ${quitButtonTextColor}
    font-size: 12px;
    padding: 5px 10px;
    margin: 20px auto;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;
