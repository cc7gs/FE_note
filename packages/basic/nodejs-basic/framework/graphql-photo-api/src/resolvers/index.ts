import  Query from './Query'
import Mutation from './Mutation'
import * as type from './Type'

const resolvers={
    Query,
    Mutation,
    ...type
}

export default resolvers