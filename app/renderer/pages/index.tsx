import { useRef } from 'react'
import ApolloClient from 'apollo-boost'
import fetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';

import { Provider } from '../components/API'
import Layout from '../components/Layout'
import Filedrop from '../components/Filedrop'
import Search from '../components/Search'

export default () => {
  const search = useRef(null)

  const client = new ApolloClient({
    fetch: fetch,
    uri: 'https://discogs.now.sh'
  })

  return (
    <Provider value={client}>
      <Layout>
        <Filedrop search={search} />
        <Search ref={search} />
      </Layout>
    </Provider>
  )
}
