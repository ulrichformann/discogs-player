import styled from 'styled-components'

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

const File = styled.div`
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
  cursor: grab;

  :first-child {
    margin-top: 12px;
  }

  :last-child {
    margin-bottom: 16px;
  }
`

const DropFile = styled(File)`
  color: #48484A;
  border: 1px dashed #48484A;
`

const Cover = styled.div`
  height: 100%;
  opacity: 0.8;
  background-image: url('https://img.discogs.com/vqmbKQxHQFLZbxlmvS68nEQ-8bM=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-2-1193657839.jpeg.jpg');
  background-size: cover;
  background-position: center center;
`

const CoverWrapper = styled.div`
  height: 48px;
  background: white;

  button {
    position: absolute;
    top: 12px;
    right: 16px;
    width: 24px;
    height: 24px;
    padding: 2px 0 0;
    background: 0;
    border: 0;
    cursor: pointer;
  }
`

interface Props {
  searched: boolean, 
  onCancel: any,
  folder: string,
  files: {
    path: string,
    name: string,
    ext: string,
    mime: string
  }[]
}

export default (props: Props) => {
  const title = '2001 asd asjdhas kdjasdasdpakjashd aksjhdk'

  return (
    <>
      <Wrapper>
        <Title>
          <FileIcon/>
          <div>{title}</div>
        </Title>
        <Files>
          <File draggable >Aasdaksdjlasjdlajsldjlasjdlasjdlasjdlasjdljasldjalksjd</File>
          <File draggable >asd</File>
          <File draggable >Aasdaksdjlasjdlajsldjlasjdlasjdlasjdlasjdljasldjalksjd</File>
          <File draggable >asd</File>
          <File draggable >asd</File>
          <File draggable >asd</File>
          <File draggable >asd</File>
          <File draggable >asd</File>
          <File draggable >asd</File>
          <File draggable >asd</File>
        </Files>
      </Wrapper>
      {props.searched && 
        <DropWrapper>
          <CoverWrapper>
            <Cover>
            </Cover>
            <button onClick={props.onCancel}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1L1 13" stroke="#E5E5EA" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 1L13 13" stroke="#E5E5EA" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </CoverWrapper>

          <Files>
            <DropFile>asdasdhalsjhdlahsdjkhs</DropFile>
            <DropFile>asd</DropFile>
            <DropFile>asd</DropFile>
            <DropFile>asd</DropFile>
            <DropFile>asd</DropFile>
            <DropFile>asd</DropFile>
            <DropFile>asd</DropFile>
            <DropFile>asd</DropFile>
            <DropFile>asd</DropFile>
            <DropFile>asd</DropFile>
          </Files>
          </DropWrapper>}
    </>
  )
}