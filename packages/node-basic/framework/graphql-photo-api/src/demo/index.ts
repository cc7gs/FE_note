// import {graphql, buildSchema } from 'graphql'

// const schema=buildSchema(`
// type Query {
//  hello:String
// }
// `)
// const root={hello:()=>'hello world'};

// graphql(schema,`{ hello }`,root).then((response)=>{
//     console.log(response)
// });

import { ApolloServer } from 'apollo-server';

const typeDefs = `
    enum PhotoCategory {
        SELFIE
        PORTRAIT
        ACTION
        LANDSCAPE
        GRAPHIC
    }
    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
        category: PhotoCategory!
    }

    type Query{
        totalPhotos:Int!
        allPhotos: [Photo!]!
    }
    input PostPhotoInput {
        name: String!
        category: PhotoCategory=SELFIE
        description: String
    }
    type Mutation {
        postPhoto(input: PostPhotoInput!):Photo!
    }
`;
let _id = 0;
const photos: any[] = [];
const resolvers = {
  Photo: {
    url: (parent: any) => `http://https://blog.ccwgs.top/img/${parent.id}.jpg`,
  },
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },
  Mutation: {
    postPhoto(_: any, args: any) {
      const newPhoto = {
        id: _id++,
        ...args.input,
      };
      photos.push(newPhoto);
      return newPhoto;
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service running on ${url}`));
