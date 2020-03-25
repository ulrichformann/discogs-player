import { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import path from 'path'
import { useDropzone } from 'react-dropzone'

import Section, { FileIcon } from './Section'

const DropArea = styled.div`
  height: 100%;
  outline: 0;
  cursor: pointer;
  background: ${(p: { active: boolean }) => p.active ? '#3A3A3C' : 'none'};
  transition: background 333ms ease;
`

const CenterLine = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
`

const FolderName = styled.div`
  max-width: calc(100% - 32px);
  margin-left: 8px;
  text-overflow: ellipsis;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  color: #8E8E93;
`

export default (props) => {
  const [ drag, setDrag ] = useState(false)

  const onDrop = useCallback(acceptedFiles => {
    setDrag(false)

    global.ipcRenderer.send('files', acceptedFiles.map(e => e.path))

    const directories = acceptedFiles.map(e => e.path)
    props.setFolder(getFolder(directories))
  }, [])

  const getFolder = (directories) => {
    const min = Math.min.apply( Math, directories.map(e => e.split(path.sep).length) )

    for (let i = 0; i < min; i++) {
      let lastV = ''

      for (let o = 0; o < directories.length; o++) {
        const val = directories[o].split(path.sep)[i]
  
        if (!lastV || val === lastV)
          lastV = val
        else
          return directories[o].split(path.sep)[i - 1]
      }
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Section>
      <DropArea 
        { ...getRootProps() } 
        onDragEnter={() => setDrag(true)}
        onDragLeave={() => setDrag(false)}
        active={drag || props.folder !== null}
      >
        <input type="file" accept="audio/*" {...getInputProps()} />
        <CenterLine>
          <FileIcon />
          {props.folder && <FolderName>{props.folder}</FolderName>}
        </CenterLine>
      </DropArea>
    </Section>
  )
}
