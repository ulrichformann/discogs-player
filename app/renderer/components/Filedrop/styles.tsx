import styled from 'styled-components'

export const DropArea = styled.div`
  height: 100%;
  outline: 0;
  cursor: pointer;
  background: ${(p: { active: boolean }) => p.active ? '#3A3A3C' : 'none'};
  transition: background 333ms ease;
`

export const CenterLine = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
`

export const FolderName = styled.div`
  max-width: calc(100% - 32px);
  margin-left: 8px;
  text-overflow: ellipsis;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  color: #8E8E93;
  font-size: 13px;
`