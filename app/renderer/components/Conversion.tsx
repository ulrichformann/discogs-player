import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'

const Wrapper = styled.div<{ loaded: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: ${p => p.loaded ? 'copy' : 'wait'};
`

const SVG = styled.svg<{ loaded: boolean }>`
  rect, text {
    transition: all 1s ease;
  }

  > rect {
    opacity: ${p => p.loaded ? 0 : 0.5};
  }

  text {
    opacity: ${p => p.loaded ? 0 : 1};
  } 

  text {
    font-size: 48px;
    font-weight: 400;
    letter-spacing: 1px;
  }
`

const Name = styled.span`
  margin-top: 16px;
  color: #8E8E93;
` 

export default (props: { data: any, fileCount: number }) => {
  const [ percentage, setPercentage ] = useState(0)
  const [ outputPath, setOutputPath ] = useState(null)
  const [ title, setTitle ] = useState(null)
  
  const percentageRef = useRef<number>()
  percentageRef.current = percentage

  useEffect(() => {
    global.ipcRenderer.on('updatePercentage', () => setPercentage(1 / props.fileCount + percentageRef.current))
    global.ipcRenderer.on('converted', (e, path) => setOutputPath(path))

    return () => {
      global.ipcRenderer.removeAllListeners('updatePercentage')
      global.ipcRenderer.removeAllListeners('converted')
    }
  }, [])
  
  useEffect(() => {
    //console.log(props.data)
    
    let t = ''
    
    if (props.data.labels.length > 0 && !!props.data.labels[0].catno)
    t += `[${props.data.labels[0].catno}] `
    
    props.data.artists.forEach(e => {
      t += `${e.join}${e.name}`
    })
    
    t += ` - ${props.data.title}`
    
    if (!!props.data.year)
    t += ` (${props.data.year})`
    
    setTitle(t)
  }, [ props.data ])

  useEffect(() => {
    percentageRef.current = percentage
  }, [ percentage ])

  const handleDragStart = (e) => {
    e.preventDefault()
    global.ipcRenderer.send('handleDragStart', outputPath)
  }
  
  return (
    <Wrapper loaded={!!outputPath} draggable={!!outputPath} onDragStart={handleDragStart}>
      <SVG loaded={!!outputPath} width="175" height="158" viewBox="0 0 175 158" fill="none">
        <text fill="#8E8E93" x="50%" y="61%" dominantBaseline="middle" textAnchor="middle">{(percentage * 100).toFixed()}%</text>
        <image 
          xlinkHref={props.data.images.find(e => e.type === 'primary').uri}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#mask)"
        />
        <rect width="100%" height="100%" clipPath="url(#mask)" fill="white" />
        <path 
          d="M174.333 139.667C174.333 149.24 166.573 157 157 157H18.3333C8.7604 157 1 149.24 1 139.667V18.3333C1 8.7604 8.7604 1 18.3333 1H59.5259C60.8633 1 62.1123 1.6684 62.8541 2.7812L77.8125 25.2188C78.5544 26.3316 79.8033 27 81.1407 27H157C166.573 27 174.333 34.7604 174.333 44.3333V139.667Z" 
          stroke="#8E8E93" 
        />
        <text fill="#1C1C1E" clipPath="url(#mask2)" x="50%" y="61%" dominantBaseline="middle" textAnchor="middle">{(percentage * 100).toFixed()}%</text>
        <clipPath id='mask'>
          <path clipPath="url(#mask2)" d="M174.333 139.667C174.333 149.24 166.573 157 157 157H18.3333C8.7604 157 1 149.24 1 139.667V18.3333C1 8.7604 8.7604 1 18.3333 1H59.5259C60.8633 1 62.1123 1.6684 62.8541 2.7812L77.8125 25.2188C78.5544 26.3316 79.8033 27 81.1407 27H157C166.573 27 174.333 34.7604 174.333 44.3333V139.667Z" />
        </clipPath>
        <clipPath id='mask2'>
          <rect width={`${percentage * 100}%`} height="100%" />
        </clipPath>
      </SVG>
      <Name>{title}</Name>
    </Wrapper>
  )
}