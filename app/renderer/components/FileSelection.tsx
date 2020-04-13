import styled, { keyframes } from 'styled-components'
import { useState, useRef, useEffect } from 'react'

import { FileIcon } from './Section'

const DropWrapper = styled.div`
  width: 50%;
  height: 100%;
  box-sizing: border-box;
`

const Wrapper = styled(DropWrapper)`
  background: #3A3A3C;
  color: #8E8E93;
`

const Title = styled.div`
  height: 32px;
  border-bottom: 1px #8E8E93 solid;
  padding: 0 0 8px;
  margin: 16px 16px 0;
  font-size: 13px;  
  box-sizing: border-box; 
  display: flex;

  div {
    display: block;
    line-height: 24px;
    margin-left: 8px;

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`

const Files = styled.div`
  padding: 0 16px;
  height: calc(100vh - 48px);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`

const File = styled.div<{ dragOver?: boolean }>`
  margin: 8px 0 0;
  height: 32px;
  background: #2C2C2E;
  border-radius: 4px;
  border: 1px solid #636366;
  color: #636366;
  box-sizing: border-box;
  padding: 8px 12px;
  font-size: 13px;
  line-height: 13px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  :first-child {
    margin-top: 12px;
  }

  :last-child {
    margin-bottom: 16px;
  }

  transition: all 333ms ease;

  ${p => p.draggable && `cursor: grab;`}
  
  ${p => p.onClick && `cursor: w-resize;`}

  ${p => p.dragOver && `
    color: #1C1C1E;
    background: #1C1C1E;
    border: 0;
  `}
`

const DropFile = styled(File)`
  color: #48484A;
  border: 1px dashed #48484A;
`

const Cover = styled.div<{url?: string}>`
  height: 100%;
  opacity: 0.8;
  background-image: url('${p => p.url}');
  background-size: cover;
  background-position: center center;
`

const CoverWrapper = styled.div`
  height: 48px;
  background: white;
`

const CancelButton = styled.button`
  position: absolute;
  background: 0;
  top: 12px;
  right: 16px;
  width: 24px;
  height: 24px;
  border: 0;
  padding: 0;
  cursor: pointer;

  :before, :after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 18px;
    height: 0px;
    transform: translate(-50%, -50%) rotate(45deg);
    border: 0.5px solid black;
    border-radius: 0.5px;
    transition: all 333ms ease;
  }

  :after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`

const ConvertButton = styled.button<{ show?: boolean }>`
  background: #F2F2F7;
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  border: 0;
  box-shadow: 0 8px 8px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 333ms ease;
  transform-origin: center;

  :hover {
    box-shadow: 0 8px 8px 0px rgba(0, 0, 0, 0.5);
  }

  animation: ${() => keyframes`
    from { opacity: 0.1 }
  `} 333ms ease forwards;
`

interface Props {
  searched: boolean, 
  onCancel: any,
  folder: string,
  convert: any,
  files: {
    path: string,
    name: string,
    ext: string,
    mime: string
  }[]
  data: any
}

export default (props: Props) => {
  const [ draggedFile, setDraggedFile ] = useState(null)
  const [ dropFileDragOver, setDropFileDragOver ] = useState(null)
  const [ files, setFiles ] = useState([])

  useEffect(() => {
    setFiles(props.data.tracklist.map(e => ({ 
      ...e,
      file: null,
      fileIndex: null,
    })))

  }, [ props.data ])

  const handleDrop = () => {
    const newFiles = files

    newFiles[dropFileDragOver].file = props.files[draggedFile]
    newFiles[dropFileDragOver].fileIndex = draggedFile

    setFiles(newFiles)
    setDropFileDragOver(null)
  }

  const handleDragOver = (e, i) => {
    e.preventDefault()
    setDropFileDragOver(i)
  }

  const handleClick = (e, i) => {
    e.preventDefault()
    
    const newFiles = [ ...files ]
    
    newFiles[i].file = null
    newFiles[i].fileIndex = null
    
    console.log(newFiles)
    
    setFiles(newFiles)
  }

  const convert = () => {
    const newFiles = [ ...files ].map(e => {
      delete e.fileIndex

      e.file = e.file.path

      return e
    })

    props.convert(newFiles)
  }

  return (
    <>
      {(files.findIndex(e => e.file == null) === -1) && <ConvertButton onClick={convert}>convert</ConvertButton>}
      <Wrapper>
        <Title>
          <FileIcon />
          <div>{props.folder}</div>
        </Title>
        <Files>
          {props.files.map((e, i) => (
            (files.map(e => e.fileIndex).indexOf(i) === -1) &&
            <File 
              key={i}
              draggable 
              onDragStart={() => setDraggedFile(i)}
              onDragEnd={() => setDraggedFile(null)} 
              onDragOver={e => e.preventDefault()}
            >
              {e .name}
            </File>
          ))}
        </Files>
      </Wrapper>
      {props.searched && 
        <DropWrapper>
          <CoverWrapper>
            <Cover url={props.data.images.find(e => e.type === 'primary').uri}>
            </Cover>
            <CancelButton onClick={props.onCancel} />
          </CoverWrapper>
          <Files>
            {files.map((e, i) => (
              !e.file ? 
                <DropFile 
                  key={i} 
                  onDragOver={e => handleDragOver(e, i)}
                  onDragLeave={() => setDropFileDragOver(null)}
                  dragOver={dropFileDragOver === i}
                  onDrop={handleDrop} 
                >
                  {!!e.position && `${e.position} - `}
                  {e.title}
                </DropFile>
              :
                <File 
                  key={i}
                  onDragOver={e => handleDragOver(e, i)}
                  onDragLeave={() => setDropFileDragOver(null)}
                  dragOver={dropFileDragOver === i}
                  onDrop={handleDrop}
                  onClick={(e) => handleClick(e, i)}
                >
                  {e.file.name}
                </File>
            ))}
          </Files>
        </DropWrapper>}
    </>
  )
}