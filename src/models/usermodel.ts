import {Schema, model} from 'mongoose';


const userSchema = new Schema({
	username: {  type:String, required:true, maxlength:20 },
	password:{ type:String, required:true},
	email:{type:String,required:true},
	createdAt: {type:Date,required:true,default:Date.now},
})

const UserModel = model('UserModel',userSchema)

export default UserModel ;