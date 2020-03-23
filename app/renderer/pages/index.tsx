import { useRef, useState } from 'react'

import Layout from '../components/Layout'
import Filedrop from '../components/Filedrop'
import FileSelection from '../components/FileSelection'
import Search from '../components/Search'

export default () => {
  const search = useRef(null)
  const [ folderSelected, setFolderSelected ] = useState(false)

  console.log(folderSelected)

  return (
    <Layout>
      {!folderSelected ? <Filedrop search={search} /> : <FileSelection />}      
      <Search ref={search} />
    </Layout>
  )
}
