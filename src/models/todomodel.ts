import { Schema, model , Types } from 'mongoose';

const todoModelSchema = new Schema({
	userid:{ type:Types.ObjectId,
		ref:'User',
		required:true,
	},
	title: { type: String,
		required: true,
		unique:true,
	 },
	description: { type: String,
		required: true,
		maxLength: 50,
	},
	createdAt: { type: Date,
		required: true,
		default: Date.now,
	},
});

const TodoModel = model('TodoModel', todoModelSchema);

export default TodoModel;
