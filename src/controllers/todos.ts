import TodoModel from '../models/todomodel'
import {Request,Response,RequestHandler} from 'express' 


export const createTodo: RequestHandler = async (req: Request, res: Response) => {
  try {
	
    const { title, description  } = req.body;
	const {userid} = res.locals 
	console.log('createtodo user ',userid);
    const response = await TodoModel.create({ title, description ,userid });
    res.status(200).json({
      success: true,
      data: response,
      message: 'Entry Created Successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: 'Internal Server Error',
      message: err.message,
    });
  }
};



export const getTodo:RequestHandler = async(req,res) =>{
	try{
		const todos = await TodoModel.find({userid:res.locals.userid})
		res.status(200).json({
			success:true,
			data:todos,
		})
	} catch(err){
		console.log(err)
		res.status(500)
		.json({
			sucess:false,
			data:"Internal Server Error",
			message:err.message,
		});
	}
};
		
	