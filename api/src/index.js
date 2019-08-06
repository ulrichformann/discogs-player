import { ApolloServer, gql } from 'apollo-server-micro'
import { Client } from 'disconnect'
import cors from 'micro-cors'

const { consumerKey, consumerSecret } = process.env

const client = new Client('DiscogsConverter/0.1', {
  consumerKey,
  consumerSecret
})

const DB = client.database()

const typeDefs = gql`
  type Urls {
    last: String
    next: String
  }

  type Pagination {
    per_page: Int
    pages: Int
    page: Int
    urls: Urls
    items: Int
  }

  type Community {
    want: Int
    have: Int
  }

  type Result {
    style: [ String ]
    thumb: String
    title: String
    country: String
    format: [ String ]
    uri: String
    community: Community
    label: [ String ]
    catno: String
    year: String
    genre: [ String ]
    resource_url: String
    type: String
    id: Int
  }
  
  type Search {
    pagination: Pagination
    results: [ Result ]
  }

  type Tracklist { 
    duration: String
    position: String
    type_: String
    title: String 
  }

  type Images { 
    height: Int
    resource_url: String
    type: String
    uri: String
    uri150: String
    width: Int 
  }

  type Artists { 
    join: String
    name: String
    anv: String
    tracks: String
    role: String
    resource_url: String
    id: Int 
  }

  type Videos { 
    duration: Int
    description: String
    embed: Boolean
    uri: String
    title: String 
  }

  type Master { 
    title: String
    main_release: Int
    main_release_url: String
    uri: String
    versions_url: String
    year: Int
    resource_url: String
    id: Int
    num_for_sale: Int
    lowest_price: Float
    data_quality: String
    tracklist: [ Tracklist ]
    images: [ Images ]
    artists: [ Artists ]
    videos: [ Videos ]
    genres: [ String ]
    styles: [ String ] 
  }

  type Query {
    search(
      page: Int
      per_page: Int
      query: String
      type: String
      title: String
      credit: String
      artist: String
      anv: String
      label: String
      genre: String
      style: String
      country: String
      year: String
      format: String
      catno: String
      barcode: String
      track: String
      submitter: String
      contributor: String
    ): Search
    masters( master_id: Int ): Master
  }
`

const resolvers = {
  Query: {
    search: async (obj, args, context, info) => {
      const res = await DB.search(args.query, { ...args })
    
      return { 
        results: res.results,
        pagination: res.pagination
      }
    },
    masters: async (obj, args, context, info) => {
      const res = await DB.getMaster(args.master_id)

      return res
    }
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
})

// nextjs API middleware
// disables body from beeing parsed
export const config = {
  api: {
    bodyParser: false
  }
}

// Fix CORS Preflight request 
// https://github.com/apollographql/apollo-server/issues/2473
const optionsHandler = (req , res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return
  }
  return apolloServer.createHandler({ path: '/' })(req, res)
}

export default cors()(optionsHandler)
