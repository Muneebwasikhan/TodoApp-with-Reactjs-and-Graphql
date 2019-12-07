import { ApolloLink, ApolloClient, concat, InMemoryCache } from 'apollo-boost'
import { createUploadLink } from 'apollo-upload-client'

// export const serverLink = 'https://pure-shelf-30254.herokuapp.com/graphql'

export const serverLink = 'http://localhost:4002/graphql'

const httpLink = createUploadLink({ uri: serverLink })
console.log(httpLink)

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  },
}

const authMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation)
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  // link: concat(httpLink),
  // link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions,
})


export default client