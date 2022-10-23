// import { makeExecutableSchema } from 'apollo-server';
// import resolvers from './resolvers'
// import { ApolloServer } from 'apollo-server-express'
import { ApolloServer } from '@apollo/server';
// const schemaPublic: string = fs
//     .readFileSync(path.resolve(__dirname, './schema/schema.graphql'))
//     .toString('utf8')
const typeDefs = `#graphql
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

# This "Book" type defines the queryable fields for every book in our data source.
type Book {
  title: String
  author: String
}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "books" query returns an array of zero or more Books (defined above).
type Query {
  books: [Book]
}
`;
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
const resolvers1 = {
    Query: {
        books: () => books,
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers1,
});
// export const schema: any = makeExecutableSchema({
//   resolvers,
//   typeDefs: [schemaPublic]
// });
