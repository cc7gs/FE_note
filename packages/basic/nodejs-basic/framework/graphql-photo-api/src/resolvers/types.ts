import {Db} from 'mongodb'
type Context={
    currentUser:any;
    db:Db
}
export type Fn=(parent:any,args:any,context:Context)=>any;