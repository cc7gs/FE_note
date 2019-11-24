import * as mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema=mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    password:{
        type: String,
        required: true  
    },
    email: {
        type: String
    },
    status:{
        type:String,
        required:true,
        enum:['active','complete','pastdue'],
        default:'active'
    },
    company: {
        type: String
    },
    phone: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save',function(next){
    if(!this.isModified('password')){
        return next()
    }
    bcrypt.hash(this.password,8,(err,hash)=>{
        if(err){
            return next(err)
        }
        this.password=hash;
        return next();
    })
})

userSchema.methods.checkPassword=function(password:string){
    const passwordHash = this.password;
    return new Promise((resovle,reject)=>{
        bcrypt.compare(password,passwordHash,(err,same)=>{
            if(err) return reject(err)
            return resovle(same)
        })
    })
}
const User=mongoose.model('user',userSchema)



export default User