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
  enum Type {
    release
    master
    artist
    label
  }

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
    data_quality: String
    have: Int
    status: String
    want: Int
    submitter: Submitter
    rating: Rating
    contributors: [ Contributors ]
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
    master: Master
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

  type Labels {
    catno: String
    entity_type: String
    id: Int
    name: String
    resource_url: String 
  }

  type Identifiers { 
    type: String 
    value: String 
  }

  type Formats { 
    name: String 
    qty: String 
    descriptions: [String ] 
  }

  type Extraartists {
    anv: String
    id: Int
    join: String
    name: String
    resource_url: String
    role: String
    tracks: String
  }

  type Companies { 
    catno: String
    entity_type: String
    entity_type_name: String
    id: Int
    name: String
    resource_url: String
  }

  type Submitter { 
    resource_url: String 
    username: String
  }

  type Rating { 
    average: Float 
    count: Int 
  }

  type Contributors { 
    resource_url: String 
    username: String 
  }

  type Release { 
    title: String
    id: Int
    data_quality: String
    thumb: String
    country: String
    date_added: String
    date_changed: String
    estimated_weight: Int
    format_quantity: Int
    lowest_price: Float
    master_id: Int
    master_url: String
    notes: String
    num_for_sale: Int
    released: String
    released_formatted: String
    resource_url: String
    status: String
    uri: String
    year: Int
    videos: [ Videos ]
    tracklist: [ Tracklist ]
    styles: [ String ]
    series: [ String ]
    labels: [ Labels ]
    images: [ Images ]
    identifiers: [ Identifiers ]
    genres: [ String ]
    formats: [ Formats ]
    extraartists: [ Extraartists ]
    companies: [ Companies ]
    community: Community
    artists: [ Artists ]
  }

  type Query {
    search(
      query: String!
      page: Int
      per_page: Int
      type: Type
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
    
    release(
      release_id: Int!
      curr_abbr: String
    ): Release
  }
`

const resolvers = {
  Query: {
    search: async (obj, args, context, info) => {
      const res = await DB.search(args.query, { ...args })

      const reqs = res.results.map(e => DB.getMaster(e.id))

      await Promise.all(reqs)

      res.results.forEach((e, i) => {
        e.master = reqs[i]
      })

      return {
        results: res.results,
        pagination: res.pagination
      }
    },
    release: async (obj, args, context, info) => {
      const res = await DB.getRelease(args.release_id)

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
const optionsHandler = (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return
  }
  return apolloServer.createHandler({ path: '/' })(req, res)
}

export default cors()(optionsHandler)
