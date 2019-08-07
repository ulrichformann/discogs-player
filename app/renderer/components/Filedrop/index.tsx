import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import path from 'path'

import { DropArea, CenterLine, FolderName } from './styles'
import Section, { FileIcon } from '../Section'

export default (props) => {
  const [ folder, setFolder ] = useState(null)
  const [ drag, setDrag ] = useState(false)

  const onDrop = useCallback(acceptedFiles => {
    const seperatedPath = acceptedFiles[0].path.split(path.sep)
    const folderName = seperatedPath[ seperatedPath.length - 2 ]

    console.log(folderName)
    setFolder(folderName)
    setDrag(false)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Section>
      <DropArea 
        { ...getRootProps() } 
        onDragEnter={() => setDrag(true)}
        onDragLeave={() => setDrag(false)}
        active={drag || folder !== null}
      >
        <input {...getInputProps()} />
        <CenterLine>
          <FileIcon>
            <path d="M22 19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H7.19722C8.3235 3 9.37526 3.56288 10 4.5V4.5C10.6247 5.43712 11.6765 6 12.8028 6H20C21.1046 6 22 6.89543 22 8V19Z" stroke="#8E8E93" />
          </FileIcon>
          {folder !== null && <FolderName>{folder}</FolderName>}
        </CenterLine>
      </DropArea>
    </Section>
  )
}
