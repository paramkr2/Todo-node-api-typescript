import mongoose , {ConnectOptions} from 'mongoose';
import dotenv from "dotenv" ;
dotenv.config({ path:  'var.env' });

const uri = process.env.DB_URL

const dbconnect = () =>{  mongoose.connect( uri , {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    } as ConnectOptions)
	.then( () => {
		console.log("DB connected") 
	})
	.catch((error)=>{
		console.log("Issue in DB Connection")
		console.log(error.message)
	})
}

export default dbconnect ;