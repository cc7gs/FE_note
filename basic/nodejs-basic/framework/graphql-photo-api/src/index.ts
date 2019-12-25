import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import expressPlayground from 'graphql-playground-middleware-express'
import * as path from 'path'
import _resolvers from './resolvers'
import { readFileSync } from 'fs'

const typeDefs = readFileSync(path.resolve(__dirname,'./schema/typeDefs.graphql'), 'UTF-8');

async function start() {
    const app = express();
    let db;
    try {

    } catch (error) {

    }
//     const typeDefs = `
//     type Query {
//         totalPhotos:Int!
//     }
// `;
    const resolvers = {
        Query: {
            totalPhotos: () => 66
        }
    }
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    server.applyMiddleware({ app });

    app.get('/', (req, res) => {
        res.send('Welcome to the PhotoShare API');
    })

    app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

    app.listen({ port: 4000 }, () => {
        console.log(`GraphQL server running @ http://localhost:4000${server.graphqlPath}`)
    })

}

start()


