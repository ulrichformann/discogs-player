import { useRef, useState, useEffect } from 'react'
import LoadingBar from 'react-top-loading-bar'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Filedrop from '../components/Filedrop'
import FileSelection from '../components/FileSelection'
import Search from '../components/Search'
import Conversion from '../components/Conversion'
import Cancel from '../components/CancelButton'

const CancelButton = styled(Cancel)`
  position: absolute;
  top: 16px;
  right: 16px;
`

export default () => {
  const search = useRef(null)
  const loadingBar = useRef(null)

  const [ folder, setFolder ] = useState('[NARKOTIK002] - DJ Freak - Rot In Hell E.P')
  const [ files, setFiles ] = useState([
    {"path":"/Users/ulrich/Music/Soulseek/complete_to_sort/[NARKOTIK002] - DJ Freak - Rot In Hell E.P/A2.wav","name":"A2.wav","ext":"wav","mime":"audio/vnd.wave"},
    {"path":"/Users/ulrich/Music/Soulseek/complete_to_sort/[NARKOTIK002] - DJ Freak - Rot In Hell E.P/A1.wav","name":"A1.wav","ext":"wav","mime":"audio/vnd.wave"},
    {"path":"/Users/ulrich/Music/Soulseek/complete_to_sort/[NARKOTIK002] - DJ Freak - Rot In Hell E.P/B1.wav","name":"B1.wav","ext":"wav","mime":"audio/vnd.wave"},
    {"path":"/Users/ulrich/Music/Soulseek/complete_to_sort/[NARKOTIK002] - DJ Freak - Rot In Hell E.P/B2.wav","name":"B2.wav","ext":"wav","mime":"audio/vnd.wave"}
  ])
  const [ data, setData ] = useState({"title":"Rot In Hell E.P.","released":"2009-01-14","released_formatted":"14 Jan 2009","year":2009,"styles":["Speedcore"],"genres":["Electronic"],"artists":[{"join":"","name":"DJ Freak","anv":"","tracks":"","role":""}],"labels":[{"catno":"NARKOTIK002"}],"tracklist":[{"position":"A1","type_":"track","title":"Rot In Hell"},{"position":"A2","type_":"track","title":"Come On In"},{"position":"B1","type_":"track","title":"Thought I Was Out"},{"position":"B2","type_":"track","title":"Gangster 3000"}],"images":[{"type":"primary","uri":"https://img.discogs.com/27_W5m636RcKpoyW9InK4NrTQQs=/fit-in/600x421/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1610060-1252922270.jpeg.jpg"},{"type":"secondary","uri":"https://img.discogs.com/muhNyMbg6ngQ0WreupTis5nAWDE=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1610060-1234661467.jpeg.jpg"},{"type":"secondary","uri":"https://img.discogs.com/ZuN2G_RZx3kBYzFYpuNVDyhz5gM=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1610060-1234661483.jpeg.jpg"}]})
  const [ converting, setConverting ] = useState(false)

  useEffect(() => {
    global.ipcRenderer.on('files', (e, f) => setFiles(f))

    return () => {
      global.ipcRenderer.removeListener('files', (e, f) => setFiles(f))
    }
  }, [])

  useEffect(() => {
    // console.log(JSON.stringify(data))
  }, [ data ])

  useEffect(() => {
    // console.log(JSON.stringify(files))
  }, [ files ])

  useEffect(() => {
    if (folder && search.current)
      search.current.focus()

    // console.log(folder)
  }, [ folder ])

  const onCancel = () => {
    setData(null)
  }

  const query = async (id) => {
    try {
      loadingBar.current.continuousStart()
      
      await fetch('https://discogs.now.sh', {
        method: 'POST',
        body: JSON.stringify({query: `{
          release(release_id: ${id}) {
            title
            released
            released_formatted
            year
            styles
            genres
            artists {
              join
              name
              anv
              tracks
              role
            }
            labels {
              catno
            }
            tracklist {
              position
              title
            }
            images {
              type
              uri
            }
          }
        }`})
      })
      .then(r => r.json())
      .then(({ data: { release } }) => {
        loadingBar.current.complete()
        setData(release)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const convert = async (files) => {
    // console.log(files)

    setConverting(true)

    global.ipcRenderer.send('convert', data, files)

    // global.ipcRenderer.on('convert', (e, f) => setFiles(f))
  }

  const handleClick = () => {
    setFolder(null)
    setFiles(null)
    setData(null)
    setConverting(false)
  }

  return (
    <>
      <LoadingBar ref={loadingBar} />
      <Layout>
        {!converting && (!(folder && data) ? 
          <>
            <Filedrop folder={folder} setFolder={setFolder} />
            <Search ref={search} query={query} />
          </> :
          <FileSelection convert={convert} searched={!!data} onCancel={onCancel} folder={folder} files={files} data={data} />
        )}
        {converting && <>
          <CancelButton color='white' onClick={handleClick} />
          <Conversion data={data} fileCount={files.length} />
        </>}
      </Layout>
    </>
  )
}
