import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import expressPlayground from 'graphql-playground-middleware-express'
import * as mongoose from 'mongoose'
import {Db} from 'mongodb'
import * as path from 'path'
import resolvers from './resolvers'
import { readFileSync } from 'fs'

const typeDefs = readFileSync(path.resolve(__dirname, './schema/typeDefs.graphql'), 'UTF-8');

require('dotenv').config()

async function start() {
    const app = express();
    const MONGO_DB = process.env.DB_HOST;
    let db:Db;

    try {
       const client= await mongoose.connect(MONGO_DB!,
            { useNewUrlParser: true }
        )
        
       db=client.connection.db
    } catch (error) {
        console.log(`
    
        Mongo DB Host not found!
        please add DB_HOST environment variable to .env file
        exiting...
         
      `)
        process.exit(1)
    }
    // const context = { db };
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async({req})=>{
            const githubToken=req.headers.authorization;
            const currentUser=await db.collection('users').findOne({githubToken})
            return {db,currentUser}
        }
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


