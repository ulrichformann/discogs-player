import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100%;
  width: calc(50% - 16px);
  margin: 0 8px;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
`

export const Border = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  rect {
    fill: none;
    stroke: #8E8E93;
    stroke-width: 2;
    stroke-dasharray: 8px, 4px;
    stroke-dashoffset: 2px;
  }
`

export const Icon = styled.svg`
  position: absolute;
  left: calc(50% - 12px);
  top: calc(50% - 12px);
`