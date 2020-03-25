import { useRef, useState, useEffect } from 'react'
import LoadingBar from 'react-top-loading-bar'

import Layout from '../components/Layout'
import Filedrop from '../components/Filedrop'
import FileSelection from '../components/FileSelection'
import Search from '../components/Search'

export default () => {
  const search = useRef(null)
  const loadingBar = useRef(null)

  const [ folder, setFolder ] = useState(null)
  const [ files, setFiles ] = useState(null)
  const [ folderSelected, setFolderSelected ] = useState(false)
  const [ searched, setSearched ] = useState(false)

  useEffect(() => {
    global.ipcRenderer.on('files', (e, f) => setFiles(f))

    return () => global.ipcRenderer.removeListener('files', (e, f) => setFiles(f))
  }, [])

  useEffect(() => {
    console.log(files)
  }, [ files ])

  useEffect(() => {
    if (folder)
      search.current.focus()
  }, [ folder ])

  const onCancel = () => {
    setSearched(false)
  }

  const query = async (id) => {
    try {
      loadingBar.current.continuousStart()
      
      await fetch('https://discogs.now.sh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({query: `{
          release(release_id: ${id}) {
            title
          }
        }`})
      })
      .then(r => r.json())
      .then(data => {
        console.log('data returned:', data)
      })
    } catch (err) {
      console.log(err)
    } finally {
      loadingBar.current.complete()
    }
  }

  return (
    <>
      <LoadingBar ref={loadingBar} />
      <Layout>
        {!folderSelected ? 
          <Filedrop folder={folder} setFolder={setFolder} /> : 
          <FileSelection searched={searched} onCancel={onCancel} folder={folder} files={files} />
        }      
        {!searched && <Search ref={search} query={query} />}
      </Layout>
    </>
  )
}
