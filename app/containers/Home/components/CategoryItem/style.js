// @flow

import styled, { css } from 'styled-components';

export default styled.div`
  background-image: url("${props => props.background}");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 120px;
  object-fit: cover;
  background-color: rgba(255, 255, 255, 0.4);
  float: left;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:hover {
    .item {
      opacity: 1;
    }
  }
  .item {
    width: 30px;
    height: 30px;
    background: #e0e0e0;
    color: #333;
    border-radius: 4px;
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    &:hover {
      background: #949494;
    }
  }
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.2);
    left: 0;
    top: 0;
    display: none;
  }
  > .active {
    font-size: 28px;
    color: white;
    position: absolute;
  }
  > img {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 18px;
    object-fit: cover;
    ${props => props.active && 'display: none;'}
  }
  > h3 {
    color: #fff;
    position: absolute;
    bottom: 16px;
    margin: 0;
    font-size: 12px;
    font-weight: normal;
  }
  > .activeWrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
    > .circle {
      margin-top: -20px;
      width: 40px;
      height: 40px;
      border-radius: 100px;
      border: 2px solid #f0b838;
      display: flex;
      align-items: center;
      justify-content: center;
      > i {
        font-size: 20px;
        color: #f0b838;
      }
    }
  }
`;
